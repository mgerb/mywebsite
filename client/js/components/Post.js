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
    this.props.appActions.fetchPost(params.post, params.category);
  }

  render() {
    const post = this.props.app.post;
    const fetched = this.props.app.fetched;
    const fetching = this.props.app.fetching;
    
    if(!fetched){
      return <Loading/>;
    }
    
    return (
      <div class="Content">
        <div>
          <div dangerouslySetInnerHTML={{__html : marked(post, {renderer : renderer})}}/>
          <Link to="/" class="link"><i class="fa fa-caret-left" aria-hidden="true"></i> Home</Link>
        </div>
      </div>
    );
  }
}
