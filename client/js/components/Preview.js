import React from 'react';
import Link from 'react-router';

import '../../assets/scss/Preview.scss';

export default class Preview extends React.Component{

    insertPosts(posts){
        let elements = [];
        for (let i in posts){
            elements.push(
                            <div class="post" key={i}>
                                <div class="date">{posts[i].date}</div>
                                <div class="intro" dangerouslySetInnerHTML={this.decodeHtml(posts[i].title.toString())}></div>
                                <div dangerouslySetInnerHTML={this.decodeHtml(posts[i].intro.toString())}></div>
                                <p><a class="link" href="#">continue reading...</a></p>
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
            <div class="Preview">
                {posts.length > 0 ? this.insertPosts(posts): ""}
            </div>
        );
    }
}
