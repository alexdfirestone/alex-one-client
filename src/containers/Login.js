import React, { useState } from 'react';
import {FormControl, FormGroup, TextField, Input, InputLabel, Button} from "@material-ui/core";
import { Auth } from 'aws-amplify';
import useAppContext from '../libs/contextLib';
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { useFormFields } from '../libs/hooksLibs';




export default function Login(){
    const { userHasAuthenticated } = useAppContext();
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState('');
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    });

    function validateForm(){
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();
        setIsLoading(true);

        try{
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push('/');
        } catch(e) {
            alert(e.message);
            setIsLoading(false);

        }

    }


    return(
        <div  className='login'>
            <div className='lander'>

                {isLoading ? 
                    <>
                    <h1>Logging in...</h1>
                    <ClipLoader/>
                    <br/>
                    <br/>
                    </>
                        :
                    <>
                    <h1>Login</h1>
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
                <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    disabled={!validateForm()}
                    onClick={handleSubmit}

                    >
                        Login
                </Button>
                </>
                }

            </div>
        </div>
    )

}