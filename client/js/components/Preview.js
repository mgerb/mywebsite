import React from 'react';
import Link from 'react-router';

export default class Preview extends React.Component{
    
    insertPosts(posts){
        let elements = [];
        for (let i in posts){
            elements.push(
                            <div key={i}>
                                <h1>{posts[i].title}</h1>
                                <p>{posts[i].date}</p>
                                <p>{posts[i].intro}</p>
                            </div>
                        );
        }
        
        return elements;
    }
    
    render(){
        const posts = this.props.posts;
        
        return (
            <div class="Previews">
                {posts.length > 0 ? this.insertPosts(posts): ""}
            </div>
        );
    }
}