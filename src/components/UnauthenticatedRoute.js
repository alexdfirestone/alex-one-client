import React from 'react';
import { Router, Redirect, useLocation, Route} from 'react-router-dom';
import useAppContext from '../libs/contextLib';


export default function({ children, ...rest}) {
    const { isAuthenticated } = useAppContext();

    return(
        <Route {...rest}>
            {!isAuthenticated?
            (
                children
            ):(
                <Redirect to='/'/>
            )}
        </Route>
    );
}