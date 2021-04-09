import React from 'react';
// import background from '../../images/background.jpg';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import EventCard from '../EventCard/EventCard';
// import Header from '../Header/Header';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../Header/Header';
// import { Box, Grid } from '@material-ui/core';

const Home = () => {
    const [events, setEvents] = useState({});

    useEffect(() => {
        fetch('http://localhost:3010/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])


    return (
        <div style={{ background: "linear-gradient(#e66465, #9198e5);", height: "100vh" }}>
            <Header />

            <div>
                <div style={{ textAlign: 'center', paddingBottom: '5%' }}>
                    <h2>I GROW BY HELPING PEOPLE IN NEED</h2>
                    <input style={{ height: '29px', marginRight: '5px' }} type="text" />
                    <Button variant="outlined" color="secondary"> Search</Button>
                </div>
            </div>

            <Container>
                <Grid container item xs={12} spacing="5" justify="center" style={{ textAlign: 'center', margin: 'auto' }} >
                    {
                        events.length > 0
                            ? events.map(event => {
                                let colors = ['#FA8072', '#8E44AD', '#6A5ACD'];
                                const random = Math.floor(Math.random() * 4)
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <EventCard event={event} myColor={colors[random]} />
                                    </Grid>
                                )
                            })
                            : <CircularProgress />
                    }
                </Grid>
            </Container>

        </div>
    );
};

export default Home;