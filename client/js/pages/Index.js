import React from 'react';

//components
import Header from '../components/Header';
import Preview from '../components/Preview';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';

//css
import '../../assets/css/normalize.css';
import '../../assets/scss/main.scss';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/css/dracula.css';

//loading icon
import loading from '../../assets/images/loading.svg';

export default class Index extends React.Component {
  componentDidMount() {
    this.props.actions.fetchPreview();
    this.page = this.props.params.page;
    this.page === 'post' ? this.props.actions.fetchPost(this.props.params.category, this.props.params.post) : "";
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      const params = nextProps.params;
      this.page = params.page;

      if (typeof params.post !== 'undefined' && typeof params.category !== 'undefined') {
        this.props.actions.fetchPost(params.category, params.post);
      }
    }
  }

  render() {
    const fetched = this.props.redux.fetched;
    const fetching = this.props.redux.fetching;

    return (
      <div>
            <Header/>
              <div class="Main">
                  {typeof this.page === 'undefined' && !fetching
                    ? <Preview posts={this.props.redux.preview.posts}
                               postLimit={this.props.redux.postLimit}
                               increasePostLimit={this.props.actions.increasePostLimit}/>
                    : null}
                  {this.page === 'post' && !fetching ? <Post content={this.props.redux.post}/> : null}
                  {fetching ? loadingElement : null}
                <Sidebar/>
              </div>
            <Footer/>
          </div>
    );
  }
}

const loadingElement = <div class="Loading">
                          <img src={loading} alt="loading..."/>
                        </div>;
