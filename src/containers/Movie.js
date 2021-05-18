import React from 'react';
import './ApiTest.css';
import { useFetch } from '../libs/hooksLibs';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleCard from '../components/Card.js';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { api } from  '../config.js';
import { useHistory } from 'react-router-dom';



export default function Movie() {
const { id, year} = useParams()
const { url, path } = useRouteMatch();
const [isLoading, setIsLoading] = React.useState('');
const history = useHistory();
console.log('url', url)
console.log('path', path)
 const fetchMovie = {
        operation: "read",
        payload: {
          TableName: "oscarMovies",
          Key: {
			id: id,
			year: year
		}
        }
      }

      function handleWatched(movie){
        if(movie.watched){
            return 'WATCHED'
        }
    return 'NOT WATCHED'
    }


    const res = useFetch("https://a9qr68a487.execute-api.us-east-1.amazonaws.com/Prod/MyResource", {
        method: 'post',
        body: JSON.stringify(fetchMovie)
      });
    if (!res.response) {
        return(
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <CircularProgress/>
                </Grid>

            </Grid>
        )
    }
    const movie = res.response.Item
    console.log(movie);
    async function handleDelete(){
        await setIsLoading(true);
        const deleteMovie = {
            operation: "delete",
            payload: {
                TableName: "oscarMovies",
                Key: {
                    id: movie.id,
                    year: movie.year
                }
            }
        }
        try{
            await fetch(api.url, {
                method: 'post',
                body: JSON.stringify(deleteMovie)
              }).then(function(response) {
                console.log(response)
                return response.json();
              });
          } catch(e) {
            alert(e.message);
            setIsLoading(false);
        }
        await setIsLoading(false);
        history.push('/movies');

    }
    return(
    <>
        <h1 style={{
            marginTop: 100,
            textAlign: 'center',
        }}>{movie.title}</h1>
        <p style={{
            textAlign: 'center',
        }}>Year Released: <b>{movie.year}</b></p>
        <p style={{
            textAlign: 'center',
        }}>STATUS: <b>{handleWatched(movie)}</b></p>

        <div style={{
            marginTop: 50,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon fontSize="large" />
            </IconButton>
            <Button variant="outlined" size="large" color="primary">
            <Link to={`${url}/edit`}>Edit</Link>
            </Button>
        </div>
    </>
    );
            }