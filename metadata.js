/*
    This script runs through each markdown post and scrapes out the title and intro.
    folder/files within posts are scanned recursively
    each post is contained within category, which is supplied by the direct parent folder
    Posts are sorted by date
    Stores all metadata in ./dist/metadata.json
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

const dir = './posts/';
const json = {
    posts: []
};

//do everything synchronously to keep posts ordered
function parse_dir(dir, folder_name){
    const posts = fs.readdirSync(dir);
    
    for(let post of posts){
        const stats = fs.statSync(dir + post);
        
        if(stats.isDirectory()){
            parse_dir(dir + post + '/', post);
        } else {
            const file = fs.readFileSync(dir+post, 'utf8');
            const tokens = marked.lexer(file, null);
            const path = dir + post;
            const temp = {
                path: path.slice(1, path.length),
                category: folder_name,
                date: post.slice(0, 10),
                title: marked('<h2>' + tokens[0].text + '</h2>'),
                intro: marked(tokens[1].text)
            }
            json.posts.push(temp);
        }
    }
}

//recursively parse posts directory for all markdown files
parse_dir(dir, 'posts');

//sort posts by date
json.posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
});

//output to public path
fs.writeFile('./dist/metadata.json', JSON.stringify(json,null,4), (err) => {
    if (err) throw err;
    console.log("Saved metadata.json");
})

//copy posts folder to dist
ncp('./posts', './dist/posts', (err) => {
 if (err) {
   return console.error(err);
 }
 console.log('copied');
});