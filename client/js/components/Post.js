import React from 'react';
import marked from 'marked';
import hljs from 'highlight.js';

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
      <div class="Preview" dangerouslySetInnerHTML={{__html : marked(this.props.content, {renderer : renderer})}}>
      </div>
    );
  }
}
