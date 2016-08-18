import React from 'react';
import Link from 'react-router';

export default class Preview extends React.Component{
    
    insertPosts(posts){
        let elements = [];
        for (let i in posts){
            elements.push(
                            <div key={i}>
                                <p>{posts[i].date}</p>
                                <h1 dangerouslySetInnerHTML={this.decodeHtml(posts[i].title.toString())}></h1>
                                <p dangerouslySetInnerHTML={this.decodeHtml(posts[i].intro.toString())}></p>
                            </div>
                        );
        }
        
        return elements;
    }
    
    decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return {__html : txt.value};
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