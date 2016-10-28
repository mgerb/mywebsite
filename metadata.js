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

const debug = process.env.NODE_ENV !== 'production';

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
        } else if(folder_name !== null && dir !== './posts/extras/'){
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

const prettyJson = debug ? JSON.stringify(json, null, 4) : JSON.stringify(json, null, null);

//output to public path
fs.writeFile('./public/metadata.json', prettyJson, (err) => {
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
