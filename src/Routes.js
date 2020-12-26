import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import About from './containers/About';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Signup from './containers/Signup';
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ApiTest from './containers/ApiTest';

export default function Routes(){
    return(
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route exact path='/about'>
                <About/>
            </Route>
            <UnauthenticatedRoute exact path='/login'>
                <Login/>
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path='/signup'>
                <Signup/>
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path='/apitest'>
                <ApiTest/>
            </AuthenticatedRoute>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
}