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
import { v4 as uuidv4 } from 'uuid';
import { api } from  '../config.js';
import { useFormFields } from '../libs/hooksLibs';
import {FormControl, FormGroup, TextField, Input, InputLabel, Select, MenuItem} from "@material-ui/core";
import { useHistory } from 'react-router-dom';



export default function EditMovie() {
const { id, year} = useParams()
const { url, path } = useRouteMatch();
console.log('url', url);
console.log('path', path);
const [status, setStatus] = React.useState(false);
const history = useHistory();
const [isLoading, setIsLoading] = React.useState('');
const [fields, handleFieldChange] = useFormFields({
    title: '',
    year: '',
    watched: null
});

const handleSwitchChange = (event) => {
    setStatus(event.target.value);
    fields.watched = event.target.value
  };



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

    async function handleSubmit(){
        await setIsLoading(true);
        const updateMovie = {
            operation: "update",
            payload: {
              TableName: "oscarMovies",
              Key: {
                id: id,
                year: year
              },
              UpdateExpression: "set watched=:w, title=:t",
              ExpressionAttributeValues: {
                ":w" : fields.watched,
                ":t" : fields.title
              },
              ReturnValues: "UPDATED_NEW"
            }
          }
          try{
            await fetch(api.url, {
                method: 'post',
                body: JSON.stringify(updateMovie)
              }).then(function(response) {
                console.log(response)
                return response.json();
              });
          } catch(e) {
            alert(e.message);
            setIsLoading(false);
        }

        await setIsLoading(false);
        await history.push('/movies');

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
                <h1>Updating Movie...</h1>
                <CircularProgress/>
                <br/>
                <br/>
                </> :
                <>
                <h1>Update Movie</h1>
                    <FormControl>
                    <InputLabel>Movie Title</InputLabel>
                    <Input
                        type='text'
                        autoFocus='true'
                        id='title'
                        defaultValue={movie.title}
                        onChange={handleFieldChange}
                        />
                </FormControl>
                <br/>
                <br/>
                <FormControl>
                <InputLabel id="label">Status</InputLabel>
                <Select labelId="label" id="watched" value={status} onChange={handleFieldChange && handleSwitchChange}>
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
                    onClick={handleSubmit}
                    >
                        Update
                </Button>
                    </>
                }
                </Grid>
        </Grid>

    );
            }