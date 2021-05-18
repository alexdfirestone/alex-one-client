import React from 'react';
import './AddMovie.css';
import { useFetch } from '../libs/hooksLibs';
import { v4 as uuidv4 } from 'uuid';
import { api } from  '../config.js';
import { useFormFields } from '../libs/hooksLibs';
import {FormControl, FormGroup, TextField, Input, InputLabel, Button, Select, MenuItem} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useRouteMatch } from 'react-router-dom';



export default function AddMovie() {
    const [isLoading, setIsLoading] = React.useState('');
    const [status, setStatus] = React.useState(false);
    const [fields, handleFieldChange] = useFormFields({
        title: '',
        year: '',
        watched: null
    });

    function validateForm(){
        return fields.title.length > 0 && fields.year.length > 0;
    }

    const handleSwitchChange = (event) => {
        setStatus(event.target.value);
        fields.watched = event.target.value
      };

    async function handleSubmit(){
        await setIsLoading(true);
        const createMovie = {
            "operation": "create",
            "payload": {
              "TableName": "oscarMovies",
              "Item": {
                "id": uuidv4(),
                "year": fields.year,
                "title": fields.title,
                "watched": fields.watched
              }
            }
          }
          try{
            await fetch(api.url, {
                method: 'post',
                body: JSON.stringify(createMovie)
              }).then(function(response) {
                console.log(response)
                return response.json();
              });
          } catch(e) {
            alert(e.message);
            setIsLoading(false);
        }
        fields.title = ''
        fields.year = ''
        await setIsLoading(false);

    }

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '60vh' }}
        >

            <Grid item xs={3}>
                {isLoading ?
                <>
                <h1>Adding Movie...</h1>
                <CircularProgress/>
                <br/>
                <br/>
                </> :
                <>
                <h1>Add Movie</h1>
                    <FormControl>
                    <InputLabel>Movie Title</InputLabel>
                    <Input
                        type='text'
                        autoFocus='true'
                        id='title'
                        defaultValue={fields.title}
                        onChange={handleFieldChange}
                        />
                </FormControl>
                <br/>
                <br/>
                <FormControl>
                    <InputLabel>Year Released</InputLabel>
                    <Input
                        type='text'
                        id='year'
                        defaultValue={fields.year}
                        onChange={handleFieldChange}

                        />
                </FormControl>
                <br/>
                <br/>
                <FormControl>
                <InputLabel id="label">Status</InputLabel>
                <Select labelId="label" id="watched" defaultValue={status} onChange={handleFieldChange && handleSwitchChange}>
                    <MenuItem value={true}>Watched</MenuItem>
                    <MenuItem value={false}>Not Watched</MenuItem>
                </Select>
                </FormControl>
                <br/>
                <br/>
                <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    disabled={!validateForm()}
                    onClick={handleSubmit}

                    >
                        Add
                </Button>
                <Link to={'/movies'}>
                    <Button variant="outlined" style={{
                        marginLeft: "1rem"
                    }}>
                        Back to Movies
                    </Button>
                </Link>
            
                    </>
                }
                </Grid>
        </Grid>

    )
}