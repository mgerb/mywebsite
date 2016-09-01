import React from 'react';
import {Link} from 'react-router';

import '../../assets/scss/Content.scss';

export default class Preview extends React.Component {

  insertPosts(posts) {
    let elements = [];
    for (let i = 0; i < this.props.postLimit && i < posts.length; i++) {
      elements.push(
        <div class="post" key={i}>
          <div class="date">
            {posts[i].date}
          </div>
          <h1 class="intro" >{posts[i].title.toString()}</h1>
          <p>{posts[i].intro.toString()}</p>
          <p>
            <Link class="link" to={`/post/${posts[i].category}/${posts[i].filename}`}>
              continue reading <i class="fa fa-caret-right" aria-hidden="true"></i>
            </Link>
          </p>
        </div>
      );
    }

    return elements;
  }

  render() {
    const posts = this.props.posts;

    return (
      <div class="Content">
        {posts.length > 0 ? this.insertPosts(posts): null}
        {posts.length > this.props.postLimit ?
          <button class="btn" onClick={this.props.increasePostLimit.bind(this)}>Load More</button>
          : null}
      </div>
    );
  }
}
