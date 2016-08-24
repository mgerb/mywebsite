import React from 'react';
import {Link} from 'react-router';

import '../../assets/scss/Preview.scss';

export default class Preview extends React.Component{

  insertPosts(posts){
    let elements = [];
    for (let i in posts){
      elements.push(
        <div class="post" key={i}>
          <div class="date">
            {posts[i].date}
          </div>
          <h2 class="intro" >{posts[i].title.toString()}</h2>
          <p>{posts[i].intro.toString()}</p>
          <p>
            <Link class="link" to={`/post/${posts[i].category}/${posts[i].filename}`}>
              continue reading...
            </Link>
          </p>
        </div>
      );
    }

    return elements;
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
