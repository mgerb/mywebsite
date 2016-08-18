import React from 'react';

//assest
import me from '../../assets/images/me.jpg';
import '../../assets/scss/Sidebar.scss';

export default class Sidebar extends React.Component{
    
    constructor(){
        super();
        
        this.state = {
            toggler: ""
        };
        
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle(){
        let temp = this.state.toggler;
        temp = temp === "open" ? "" : "open";  
        
        this.setState({
            toggler: temp
        });
    }
    
    render(){
        return(
            <div class={"Sidebar " + this.state.toggler}>
                <a onClick={this.onToggle} class="toggler"><i class="fa fa-2x fa-navicon" aria-hidden="true" /></a>
                <a href="#" class="link">Test 1234</a>
                <p>Test 123</p>
                <p>Test 123</p>
                <p>Test 123</p>
                <p>Test 123</p>
                <p>Test 123</p>
                <p>Test 123</p>
                <p>Test 123</p>
            </div>
            );
    }
}