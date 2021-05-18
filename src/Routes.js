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
import AddMovie from './containers/AddMovie';
import Movies from './containers/Movies';
import Movie from './containers/Movie';
import EditMovie from './containers/EditMovie';

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
            <AuthenticatedRoute exact path='/addmovie'>
                <AddMovie/>
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path='/movies'>
                <Movies/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={`/movies/:year/:id/edit`}>
                <EditMovie />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={`/movies/:year/:id`}>
                <Movie />
            </AuthenticatedRoute>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    )
}