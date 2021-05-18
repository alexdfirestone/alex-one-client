import React from 'react';
import './ApiTest.css';
import { useFetch } from '../libs/hooksLibs';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleCard from '../components/Card.js';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import AuthenticatedRoute from '../components/AuthenticatedRoute';




export default function ChangeStatus() {
const { id, year} = useParams()
 const { url, path } = useRouteMatch();
 console.log('url', url)
 console.log('path', path)
 

 


}