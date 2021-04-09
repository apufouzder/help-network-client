import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Container, Grid } from '@material-ui/core';
import Header from '../Header/Header';
import { UserContext } from '../../App';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '10px',
        boxShadow: '0px 2px 5px lightGray',
        padding: '15px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '15px'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 200,
        height: 200,
        borderRadius: '6px'
    },
}));

const Events = () => {
    const classes = useStyles();
    const [loggedInUser] = useContext(UserContext);
    const [events, setEvents] = useState([]);
    // const [allEvents, setAllEvents] = useState([]);
    // console.log(events);
    useEffect(() => {
        fetch('http://localhost:3010/registered-event')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
            })
    }, [])

    const handleDeleteEvent = (id) => {
        fetch(`http://localhost:3010/cancelEvent/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },

        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                const filterEvents = events.filter(data => data._id !== id)
                if (result) {
                    setEvents(filterEvents)
                }
            })
    }
    return (
        <>
            <Header />
            <Container>
                <h1>Welcome! <span style={{ color: '#3f51b5' }}>{loggedInUser.name}</span></h1>
                <Grid container item xs={12} spacing="3" justify="" style={{ margin: 'auto' }}>
                    {
                        events.length > 0
                            ? events.map(event => {
                                return (
                                    <Grid container item md={6} lg={6} sm={12}>
                                        <Card className={classes.root}>

                                            <CardMedia
                                                className={classes.cover}
                                                image={event.img}
                                                title="Live from space album cover"
                                            />
                                            <div className={classes.details}>
                                                <CardContent className={classes.content}>
                                                    <Typography component="h5" variant="h5">
                                                        {event.eventName}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="textSecondary">
                                                        {event.date}
                                                    </Typography>
                                                    <Button onClick={() => handleDeleteEvent(event._id)} style={{ marginTop: '27px' }} variant="contained" color="secondary">Cancel</Button>
                                                </CardContent>
                                            </div>
                                        </Card>
                                    </Grid>
                                )
                            })
                            : <CircularProgress />
                    }
                </Grid>

            </Container>
        </>
    );
};

export default Events;