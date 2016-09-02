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
import Preview from './components/Preview';
import Post from './components/Post';
import SensorInfo from './components/sensors/SensorInfo';

function mapStateToProps(state) {
    return {
        redux: state.reducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Index);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Preview}/>
                <Route path="post/:category/:post" component={Post}/>
                <Route path="sensor/:location/:year/:month" component={SensorInfo}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
