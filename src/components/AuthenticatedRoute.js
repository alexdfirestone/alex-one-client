import React from 'react';
import { Router, Redirect, useLocation, Route} from 'react-router-dom';
import useAppContext from '../libs/contextLib';


export default function AuthenticatedRoute({ children, ...rest}){

    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();

    return(
        <Route {...rest}>
            {isAuthenticated ? (
                children
            ) : (
                <Redirect to={`/login?redirect=${pathname}${search}`}
            />)
            }
        </Route>
    );
}