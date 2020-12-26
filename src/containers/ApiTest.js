import React from 'react';
import './ApiTest.css';
import { useFetch } from '../libs/hooksLibs';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ApiTest() {
    const res = useFetch("https://restcountries.eu/rest/v2/regionalbloc/eu", {});
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
    const europeanCountries = res.response;
    console.log(europeanCountries);
    return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '400vh' }}
      >
        <Grid item xs={5}>
            <h1>European Countries</h1>
                {europeanCountries.map((country, index) => {
                    return(
                        <>
                            <h3>{country.name}</h3>
                            <p>Capital: {country.capital}</p>
                        </>
                    )
                })}
        </Grid>
      </Grid>
    );



}