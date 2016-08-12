import React from 'react';

//components
import Header from '../components/Header';
import Previews from '../components/Previews';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

//css
import '../../assets/css/normalize.css';
import '../../assets/scss/main.scss';

export default class Index extends React.Component{
    render(){
        return(
            <div class="Layout">
                <Header/>
                <div class="Main">
                    <Previews/>
                    <Sidebar/>
                </div>
                <Footer/>
            </div>
            );
    }
}