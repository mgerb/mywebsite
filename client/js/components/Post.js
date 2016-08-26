import React from 'react';
import {Link} from 'react-router';
import marked from 'marked';
import hljs from 'highlight.js';

import '../../assets/scss/Content.scss';

const renderer = new marked.Renderer();

marked.setOptions({
    langPrefix: 'hljs ',
    highlight: (code) => {
      return  hljs.highlightAuto(code).value;
    }
});

export default class Post extends React.Component{

  render(){
    return(
      <div class="Content">
        <div dangerouslySetInnerHTML={{__html : marked(this.props.content, {renderer : renderer})}}>
        </div>
        <Link to="/" class="link"><i class="fa fa-caret-left" aria-hidden="true"></i> Home</Link>
      </div>
    );
  }
}
