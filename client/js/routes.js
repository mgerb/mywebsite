import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';

import Index from './pages/Index';

class App extends React.Component{
    render(){
        return(
            <div>{React.cloneElement(this.props.children, this.props)}</div>  
        );
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="/test" component={Index}/>
        </Route>
    </Router>
),document.getElementById('app'));