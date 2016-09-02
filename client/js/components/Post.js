import hljs from 'highlight.js';
import marked from 'marked';
import React from 'react';
import {Link} from 'react-router';

//components
import Loading from './utils/Loading';

import '../../assets/scss/Content.scss';

const renderer = new marked.Renderer();

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code) => {
    return hljs.highlightAuto(code).value;
  }
});

export default class Post extends React.Component {

  componentDidMount() {
    const params = this.props.params;
    this.props.actions.fetchPost(params.category, params.post);
  }

  render() {
    const post = this.props.redux.post;
    const fetched = this.props.redux.fetched;
    const fetching = this.props.redux.fetching;

    return (
      <div class="Content">
          {fetched ?
          <div>
            <div dangerouslySetInnerHTML={{__html : marked(post, {renderer : renderer})}}/>
            <Link to="/" class="link"><i class="fa fa-caret-left" aria-hidden="true"></i> Home</Link>
          </div>
          : <Loading/>}
        </div>
    );
  }
}
