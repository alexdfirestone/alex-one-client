import React, { useState } from 'react';
import { useFormFields } from '../libs/hooksLibs';
import { useHistory } from 'react-router-dom';
import useAppContext from '../libs/contextLib';
import {FormControl, FormGroup, TextField, Input, InputLabel, Button} from "@material-ui/core";
import { Auth } from 'aws-amplify';
import ClipLoader from "react-spinners/ClipLoader";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Signup(){
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: '',
    });

    const history = useHistory()
    const [newUser, setNewUser] = React.useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm(){
        return(
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.confirmPassword === fields.password
        );

    }

    function validateConfirmationForm(){
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();
        setIsLoading(true);

        try{
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
            })
            setIsLoading(false);
            setNewUser(newUser);
        } catch(e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event){
        event.preventDefault();
        setIsLoading(true);
        try{
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push('/');
        } catch(e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    function renderConfirmationForm(){
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
                {isLoading ?
                                <>
                                    <h1>Verifying...</h1>
                                    <CircularProgress/>
                                    <br/>
                                    <br/>
                                </>
                            :
                             <>
                                <h3>Please check your email for the code.</h3>
                                <FormControl>
                                    <InputLabel>Confirmation Code</InputLabel>
                                    <Input
                                        id='confirmationCode'
                                        value={fields.confirmationCode}
                                        onChange={handleFieldChange}
                                    />
                                </FormControl>
                                <br/>
                                <br/>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type='submit'
                                    disabled={!validateConfirmationForm()}
                                    onClick={handleConfirmationSubmit}
                                >
                                    Verify
                                </Button>
                            </>}
                </Grid>
            </Grid>

        )

    }

    function renderForm(){
        return(
            <Grid
                container
                spacing={0}
                direction="column" 
                alignItems='center'
                justify="center"
                style={{ minHeight: '10vh' }}
            >

        <Grid item xs={3}>
        {isLoading ?
                <>

                    <h2>Registering your account...</h2> 
                    <CircularProgress/>
                </> :
                <>
                    <h1>Sign Up</h1>
                    <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                    type='email'
                    autoFocus='true'
                    id='email'
                    value={fields.email}
                    onChange={handleFieldChange}
                />
            </FormControl>
            <br/>
            <br/>
            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                    type='password'
                    id='password'
                    value={fields.password}
                    onChange={handleFieldChange}
                />
            </FormControl>
            <br/>
            <br/>
            <FormControl>
                <InputLabel>Confirm Password</InputLabel>
                <Input
                    type='password'
                    id='confirmPassword'
                    value={fields.confirmPassword}
                    onChange={handleFieldChange}
                />
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
                        Sign Up
                </Button>
                </>
                }
        </Grid>
</Grid>
        )
    }

    return(
        <div>
            <h1>Sign Up</h1>
           {newUser === null ? renderForm(): renderConfirmationForm()}
        </div>
    )


}