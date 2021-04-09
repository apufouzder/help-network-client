import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SideBar from '../SideBar/SideBar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddEvent from '../AddEvent/AddEvent';
import { UserContext } from '../../App';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTableCell = withStyles((theme) => ({
    head: {
        background: 'ghostwhite'
    },
    body: {
        fontSize: 14,
    },
    th: {
        border: 'none'
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'white',
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 900,
    },
})


const AdminPanel = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allEvents, setAllEvents] = useState([]);
    const classes = useStyles();
    // console.log(allEvents);
    useEffect(() => {
        fetch('http://localhost:3010/registered-event')
            .then(res => res.json())
            .then(data => {
                setAllEvents(data)
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
                const filterEvents = allEvents.filter(data => data._id !== id)
                if (result) {
                    setAllEvents(filterEvents)
                }
            })
    }
    return (
        <>

            <Grid container item xs={12}>
                <Grid item md={2} xs={12}>
                    <SideBar />
                </Grid>
                {
                    loggedInUser.clicked === 'helpList' &&
                    <Grid md={9} style={{ marginLeft: '25px', marginTop: '30px' }}>
                        <h2>
                            <span style={{ color: '#3f51b5' }}>Manage </span> Register List
                        </h2>
                        <TableContainer component={Paper} style={{ boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)', padding: '20px', borderRadius: '15px' }}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ border: 'none', fontWeight: 'bold', color: '#6f747d' }}>Name</StyledTableCell>
                                        <StyledTableCell style={{ border: 'none', fontWeight: 'bold', color: '#6f747d' }} align="right">Email</StyledTableCell>
                                        <StyledTableCell style={{ border: 'none', fontWeight: 'bold', color: '#6f747d' }} align="right">Registration Date</StyledTableCell>
                                        <StyledTableCell style={{ border: 'none', fontWeight: 'bold', color: '#6f747d' }} align="right">Volunteer list</StyledTableCell>
                                        <StyledTableCell style={{ border: 'none', fontWeight: 'bold', color: '#6f747d' }} align="right">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        allEvents.length > 0
                                            ? allEvents.map((event) => (
                                                <StyledTableRow key={event._id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {event.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{event.email}</StyledTableCell>
                                                    <StyledTableCell align="right">{event.date}</StyledTableCell>
                                                    <StyledTableCell align="right">{event.eventName}</StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <DeleteForeverIcon
                                                            onClick={() => handleDeleteEvent(event._id)}
                                                            style={{ color: 'red', cursor: 'pointer' }} />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                            : <div style={{ margin: 'auto' }}><CircularProgress /></div>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                }
                {
                    loggedInUser.clicked === 'addEvent' && <AddEvent />
                }



            </Grid>
        </>
    );
};

export default AdminPanel;