# How content is loaded on this site

I wanted a way that would be easy to create content for this site and keep it organized at the same time. Each post is written in markdown and converted to HTML on the client side.

***

## What are my options?

I needed to find a markdown to HTML library for Javascript. There are many different libraries to choose from. I had a hard time finding the right one because I wanted the capability to step through the markdown file one element at a time. Most of the libraries do not offer this functionality out of the box. I found [MarkedJS](https://github.com/chjj/marked), a markdown parser and compiler that was just what I had in mind. MarkedJS also offered [HighlighJS](https://highlightjs.org/) support, which is why the code in my posts is colored nicely.

## How does the index page show all the previews?

Before I started I knew that I was going to load markdown on two different pages: the index page and the post page itself. The post page was easy (this page), just fetch the entire markdown file and do the conversion in the client.

The tricky part was the preview page. How was I going to load a small part of every markdown file into one page? Here are a few different idea that I had. Each has its trade offs.

1. End point that processes each markdown file and returns a JSON response.
2. End point that returns a list of files names, which the client can request and process.
3. Create a JSON file with preview information, which the client requests when loading the index page.

Option 1 seemed like the best approach because it would allow me to dump any file in a directory, which would then be served in the preview page in real time. The problem with this approach is that it would be a very heavy load on the server doing IO on every markdown file. I could have gotten into server caching, but I wanted to keep my server code as simple as possible.

Option 2 would have been less load on the server because it would only be looking at file names, rather than content in the file. I'm not sure exactly how much this saves on performance, but it would also increase the bandwidth because each file would have been requested from the client in its entirety.

I went with option 3. It was the most practical approach (that I can think of writing this post) for this site. It is little to no load on the server as it is just placed in the public directory and it is converted directly to a JSON object on the client side. I don't need to update posts in real time and I am okay with rebuilding/redeploying this site every time I create a new piece of content.

## Creating the JSON file

Obviously I wasn't going to create this JSON file manually and continually update it. I want to be able to delete my public directory completely every time I rebuild the code. This meant I needed to store the posts in a separate folder and somehow copy them to the public directory during the build process.

I wrote a NodeJS script that parses through each file in the "Posts" directory and creates a JSON object with preview content from each post. The object is then saved as a JSON file in the public directory. [MarkedJS](https://github.com/chjj/marked) is used to parse each element of the markdown file. The script is displayed in its entirety at the bottom of this page.

## Including this in the build process

I use webpack to build my site into a single folder. This new script that I made can be run with `node filename.js`, or in my case `babel-node filename.js` because I used ES6 syntax. After webpack builds the public directory this script is executed. It creates a `metadata.json` file and recursively copies the posts folder into the public directory.

Here are my current build and deploy scripts for automating the entire process.

```json
    
    {
        "deploy": "npm run get_dependencies && npm run prod && ./mywebsite",
        "get_dependencies": "go get ./server && npm install",
        "prod": "webpack -p --define process.env.NODE_ENV='\"production\"' --progress --colors && babel-node metadata.js && go build ./server/mywebsite.go"
    }
    
```

That may seem a little confusing so I will explain. When I run `npm run deploy`, go/npm dependencies are installed, webpack builds the project in production mode, our new script in run, the server code is built into an executable, and finally the executable runs.

## Displaying the content on the client

This is the easy part. All we need to do is request the metadata.json file from the public directory, parse it into an object, and insert the content into the index page dynamically. We then know which file to request when loading the post page. The file is requested and then converted to HTML in the client. This can all be done with a simple AJAX request, but in my case I use the new fetch library with React/Redux. Most of this process is meant for another post though.

## Code for metadata.js

```javascript

/*
    This script runs through each markdown post and scrapes out the title and intro.
    folder/files within posts are scanned recursively
    each post is contained within category, which is supplied by the direct parent folder
    Posts are sorted by date
    Stores all metadata in ./public/metadata.json
    Client uses metadata to display posts on preview page
*/

import fs from 'fs';
import ncp from 'ncp';
import marked from 'marked';
import highlight from 'highlight.js';

marked.setOptions({
    header: true,
    highlight: (code) => {
        return highlight.highlightAuto(code).value;
    }
});

const rootDirectory = './posts/';
const json = {
    posts: []
};

//do everything synchronously to keep posts ordered
//we are not worried about execution time since this script only runs once when building
//ignores files that are not in a directory
function parse_dir(dir, folder_name = null){
    const posts = fs.readdirSync(dir);

    for(let post of posts){
        const stats = fs.statSync(dir + post);

        if(stats.isDirectory()){
            parse_dir(dir + post + '/', post);
        } else if(folder_name !== null){
            const file = fs.readFileSync(dir+post, 'utf8');
            const tokens = marked.lexer(file, null);
            const temp = {
                filename: post.slice(0, post.length - 3),
                category: folder_name,
                date: post.slice(0, 10),
                title: `<h1>${tokens[0].text}</h1>`,
                intro: marked(tokens[1].text)
            }
            json.posts.push(temp);
        }
    }
}

//recursively parse posts directory for all markdown files
//folder defaults to null and immediate child files are not added to json
parse_dir(rootDirectory);

//sort posts by date
json.posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
});

//output to public path
fs.writeFile('./public/metadata.json', JSON.stringify(json,null,4), (err) => {
    if (err) throw err;
    console.log("Saved metadata.json");
})

//copy posts folder to public
ncp('./posts', './public/posts', (err) => {
 if (err) {
   return console.error(err);
 }
 console.log('copied');
});

```