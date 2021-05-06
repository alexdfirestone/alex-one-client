import React from 'react';
import './ApiTest.css';
import { useFetch } from '../libs/hooksLibs';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleCard from '../components/Card.js'


export default function Movies() {
 const fetchMovies = {
        operation: "scan",
        payload: {
          TableName: "oscarMovies"
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
        body: JSON.stringify(fetchMovies)
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
    const movies = res.response.Items
    console.log(movies);
    return(
    <>
        <h1 style={{
            marginTop: 100,
            textAlign: 'center',
        }}>Oscar Nominated Movies</h1>
        <Grid
        container
        spacing={24}
        direction="row"
        alignItems="flex-start"
        justify="center"
        style={{
            gap: '15',
            marginTop: 50
        }}
      >
                {movies.map((movie, index) => {
                    return(
                        <Grid item md={3} style={{ padding: 20 }}>
                            <SimpleCard title={movie.title} year={movie.year} status={handleWatched(movie)}/>
                            <br/>
                        </Grid>

                    )
                })}
      </Grid>
    </>
    );



}