import React from 'react';

export default class Previews extends React.Component{
    
    insertPosts(){
        let posts = [];
        
        for (let i = 0; i < 10; i++){
            posts.push(<p key={i}>This is a test push {i}</p>);
        }
        
        return posts;
    }
    
    render(){
        return (
            <div class="Previews">{this.insertPosts()}</div>
            );
    }
}