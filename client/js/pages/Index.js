import React from 'react';

//components
import Header from '../components/Header';
import Preview from '../components/Preview';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

//css
import '../../assets/css/normalize.css';
import '../../assets/scss/main.scss';
import 'font-awesome/css/font-awesome.min.css';

export default class Index extends React.Component{
    componentDidMount(){
        this.props.actions.fetchPreview();
    }
    
    render(){
        return(
                <div class="Layout">
                    <Header/>
                    <div class="Main">
                        <Preview posts={this.props.redux.preview.posts}/>
                        <Sidebar />
                    </div>
                    <Footer/>
                </div>
            );
    }
}