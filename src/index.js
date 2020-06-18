import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App";
import * as serviceWorker from './serviceWorker';
import firebase from "./firebase";

import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";

import FCRegister from "./components/Auth/FCRegister";
import FCLogin from "./components/Auth/FCLogin";

//Spinner
import Spinner from "./Spinner";

// Redux
import {createStore} from "redux";
import {Provider, connect} from "react-redux";
// import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "./reducers";
import {setUser, clearUser} from "./actions";


const store = createStore(rootReducer);

const Root = ({history, setUser, isLoading, clearUser}) => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                history.push('/');
            }else {
                history.push('/login');
                clearUser();
            }
        })
    }, []);

    return (
        isLoading ? <Spinner /> : (
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/login' component={FCLogin}/>
            <Route path='/register' component={FCRegister}/>
        </Switch>
        )
    )
};

const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateToProps, {setUser, clearUser})(Root));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootWithAuth/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));


serviceWorker.unregister();
