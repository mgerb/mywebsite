import React from 'react';
import {Link} from 'react-router';

//components
import Loading from './utils/Loading';

import '../../assets/scss/Content.scss';

export default class Preview extends React.Component {

  componentDidMount() {
    this.props.actions.fetchPreview();
  }

  insertPosts(posts) {
    let elements = [];
    for (let i = 0; i < this.props.redux.postLimit && i < posts.length; i++) {
      elements.push(
        <div class="post" key={i}>
          <div class="date">
            {posts[i].date}
          </div>
          <div dangerouslySetInnerHTML={{__html : posts[i].title.toString() + posts[i].intro.toString()}} />
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
    const posts = this.props.redux.preview.posts;
    const postLimit = this.props.redux.postLimit;
    const increasePostLimit = this.props.actions.increasePostLimit;
    const fetched = this.props.redux.fetched;

    return (
      <div class="Content">
        {fetched ?
        <div>
          {posts.length > 0 ? this.insertPosts(posts): null}
          {posts.length > postLimit ?
            <button class="btn" onClick={increasePostLimit}>Load More</button>
            : null}
        </div>
        : <Loading/>}
      </div>
    );
  }
}
