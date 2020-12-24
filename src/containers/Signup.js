import React, { useState } from 'react';
import { useFormFields } from '../libs/hooksLibs';
import { useHistory } from 'react-router-dom';
import useAppContext from '../libs/contextLib';
import {FormControl, FormGroup, TextField, Input, InputLabel, Button} from "@material-ui/core";
import { Auth } from 'aws-amplify';
import ClipLoader from "react-spinners/ClipLoader";

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
            <div className='signup'>
                <div className='lander'>
                    {isLoading ?
                            <>
                                <h1>Verifying...</h1>
                                <ClipLoader/>
                                <br/>
                                <br/>
                            </>:
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
                </div>
            </div>

        )

    }

    function renderForm(){
        return(
        <div className='signup'>
            <div className='lander'>
                {isLoading ?
                <>

                    <h2>Registering your account...</h2> 
                    <ClipLoader/>
                </> :
                <>
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
            </div>
        </div>
        )
    }

    return(
        <div>
            <h1>Sign Up</h1>
           {newUser === null ? renderForm(): renderConfirmationForm()}
        </div>
    )


}