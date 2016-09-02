import React from 'react';

//components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

//css
import '../../assets/css/normalize.css';
import '../../assets/scss/main.scss';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/css/dracula.css';

export default class Index extends React.Component {

  render() {
    return (
      <div>
            <Header/>
              <div class="Main">
                {React.cloneElement(this.props.children, this.props)}
                <Sidebar/>
              </div>
            <Footer/>
          </div>
    );
  }
}