import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';

marked.setOptions({
    header: true,
    highlight: (code) => {
        return highlight.highlightAuto(code).value;
    }
});

export default class Post extends React.Component{

  render(){
    return(
      <div class="Preview" dangerouslySetInnerHTML={{__html : marked(this.props.content)}}>
      </div>
    );
  }
}
