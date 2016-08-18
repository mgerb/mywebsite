//react imports
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';

//redux imports
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import store, {history} from './redux/store';

//import actions
import * as actions from './redux/actions';

import Index from './pages/Index';

class Main extends React.Component{
    render(){
        return(
            <div>{React.cloneElement(this.props.children, this.props)}</div>  
        );
    }
}

function mapStateToProps(state){
    return {
        redux: state.reducer
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(actions, dispatch)
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Index}/>
                <Route path="/:page" component={Index}/>
            </Route>
        </Router>
    </Provider>
),document.getElementById('app'));