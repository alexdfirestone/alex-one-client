import React, { useEffect } from 'react';
import './ApiTest.css';
import { useFetch } from '../libs/hooksLibs';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleCard from '../components/Card.js';
import { Link, useRouteMatch } from 'react-router-dom';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { api } from  '../config.js';
import {Button } from "@material-ui/core";



export default function Movies() {
 const { url, path } = useRouteMatch();
 const [isLoading, setIsLoading] = React.useState('');
 console.log('url', url)
 console.log('path', path)
 const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-08-18T21:11:54")
  );
const [response, setResponse] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
          await setIsLoading(true);
          let selectedDateString = selectedDate.toString();
          selectedDateString = selectedDateString.substring(11,15);
          const fetchMoviesByYear = {
            operation: "year",
            payload: {
              TableName: "oscarMovies",
              FilterExpression: "#year=:yr",
              ExpressionAttributeValues: {
                ":yr": selectedDateString
              },
                  ExpressionAttributeNames: {
                      "#year": "year"
                  }
            }
          }
        try{
            const res = await fetch(api.url, {
                  method: 'post',
                  body: JSON.stringify(fetchMoviesByYear)
            })
            const json = await res.json()
            setResponse(json);
            setIsLoading(false);
          } catch(e) {
            alert(e.message);
            setIsLoading(false);
            }
          }
          fetchData()
  }, [selectedDate]);

  console.log(response.Items)



  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    function handleWatched(movie){
        if(movie.watched){
            return 'WATCHED'
        }
    return 'NOT WATCHED'
    }

    if (!response) {
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
    const movies = response.Items
    console.log(movies);
    return(
    <>
        <h1 style={{
            marginTop: 100,
            textAlign: 'center',
        }}>Oscar Nominated Movies</h1>
        <div style={{
        }}>
        <Link to={'/addmovie'}>
        <Button variant="contained" color="primary" style={{
            float:"right",
            marginRight: '5rem'
        }}>
              Add Movie
        </Button>
        </Link>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <DatePicker
                  variant="inline"
                  openTo="year"
                  views={["year"]}
                  label="Year"
                  helperText="Start from year selection"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Grid>
          </MuiPickersUtilsProvider>
          </div>
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
                            <SimpleCard title={movie.title} year={movie.year} status={handleWatched(movie)} id={movie.id} url={url}  />
                            <br/>
                        </Grid>


                    )
                })}
      </Grid>
    </>
    );



}