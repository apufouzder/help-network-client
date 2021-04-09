import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';
import firebaseConfig from '../../firebase.config';
import { Button, Container, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import { UserContext } from '../../App';
import google from '../../images/google.png';
import { FaFacebook } from 'react-icons/fa';


!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = { name: displayName, email, photoURL }
            setLoggedInUser(signedInUser);
            history.replace(from);
            console.log('signedInUser', photoURL);
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log('errorMessage', errorMessage);
        });
    }
    return (
        <Container>
            <div style={{ padding: '50px 0' }}>
                <form onSubmit="">
                    <FormGroup style={{ width: '400px', margin: 'auto', padding: '20px', boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)', borderRadius: '5px' }}>

                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h2>
                                {newUser ? 'Create an account' : 'Login'}
                            </h2>
                        </div>

                        {newUser &&
                            <FormControl style={{ marginBottom: '10px' }}>
                                <InputLabel htmlFor="name">Full Name</InputLabel>
                                <Input name="name" required />
                            </FormControl>
                        }

                        <FormControl style={{ marginBottom: '10px' }}>
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input name="email" required />
                        </FormControl>

                        <FormControl style={{ marginBottom: '10px' }}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" required />
                        </FormControl>

                        {newUser &&
                            <FormControl style={{ marginBottom: '10px' }}>
                                <InputLabel htmlFor="conPassword">Confirm Password</InputLabel>
                                <Input name="conPassword" required />
                            </FormControl>
                        }

                        <Button variant="contained" color="primary" type="submit">
                            {newUser
                                ? 'Create an account'
                                : 'Login'
                            }
                        </Button>

                        <p style={{ textAlign: 'center' }}>
                            {newUser
                                ? "Already have an account "
                                : "Don't have an account? "
                            }
                            <a href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setNewUser(!newUser)
                                }}
                            >
                                {newUser ? ' Login' : ' Create an account'}
                            </a>
                        </p>

                        <div>
                            <button
                                style={{
                                    outline: 'none',
                                    width: '100%',
                                    borderRadius: '25px',
                                    border: '1px solid gray',
                                    background: 'white',
                                    fontSize: '17px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    marginBottom: '12px'
                                }}
                                onClick={handleGoogleSignIn}>
                                <span style={{ marginRight: '60px' }}>
                                    <img height="34px" src={google} alt="" />
                                </span>
                                <span>Continue with Google</span>
                            </button>
                            <button
                                style={{
                                    width: '100%',
                                    outline: 'none',
                                    borderRadius: '25px',
                                    border: '1px solid gray',
                                    background: 'white',
                                    fontSize: '17px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    marginBottom: '12px'
                                }}
                                onClick={handleGoogleSignIn}>
                                <span style={{
                                    color: '#0b6de6',
                                    fontSize: '26px',
                                    marginRight: '70px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px 0'
                                }}>
                                    <FaFacebook />
                                </span>
                                <span>Continue with Facebook</span>
                            </button>
                        </div>
                    </FormGroup>
                </form>
            </div>
        </Container >
    );
};

export default Login;