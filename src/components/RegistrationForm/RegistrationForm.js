import { Button, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import logo from '../../images/Group 1329.png';

const RegistrationForm = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const [form, setForm] = useState({
        img: loggedInUser.event?.img
    })

    const handleSubmitForm = (event) => {
        event.preventDefault()
        fetch('http://localhost:3010/form-submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push('/events')
                }
            })
    }
    return (
        <>
            <div style={{ marginTop: '50px', }}>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Link to="/">
                        <img style={{ width: '200px' }} src={logo} alt="" />
                    </Link>
                </div>

                <form onSubmit={handleSubmitForm}>
                    <FormGroup style={{ width: '350px', margin: 'auto', padding: '20px', boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)', borderRadius: '5px' }}>

                        <h2 style={{ textAlign: 'center' }}>Registration</h2>
                        <FormControl style={{ marginBottom: '10px' }}>
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <Input onBlur={(event) => setForm({ ...form, name: event.target.value })} name="name" required />
                        </FormControl>

                        <FormControl style={{ marginBottom: '10px' }}>
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input onBlur={(event) => setForm({ ...form, email: event.target.value })} name="email" value={loggedInUser.email} required />
                        </FormControl>

                        <FormControl style={{ marginBottom: '10px' }}>
                            <Input onBlur={(event) => setForm({ ...form, date: new Date(event.target.value).toDateString() })} name="date" type="date" required />
                        </FormControl>

                        <FormControl style={{ marginBottom: '10px' }}>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input onBlur={(event) => setForm({ ...form, description: event.target.value })} name="description" required />
                        </FormControl>

                        <FormControl style={{ marginBottom: '20px' }}>
                            <InputLabel htmlFor="organization">Organization Name</InputLabel>
                            <Input onBlur={(event) => setForm({ ...form, eventName: event.target.value })} name="organization" value={loggedInUser.event?.name} required />
                        </FormControl>

                        <Button variant="contained" color="primary" type="submit">Registration</Button>

                    </FormGroup>
                </form>
            </div>
        </>
    );
};

export default RegistrationForm;