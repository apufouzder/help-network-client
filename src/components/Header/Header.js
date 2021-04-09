import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../images/Group 1329.png';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { UserContext } from '../../App';
import './Header.css';

const useStyles = makeStyles(() => ({

    root: {
        flexGrow: 1,
    },
    menuButton: {
    },
    title: {
        flexGrow: 1,
    },

}));



const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <>
            <Grid container xs={12} justify="space-between" style={{ padding: '10px 20px', alignItems: 'center' }}>

                <Typography variant="h6" className={classes.title}>
                    <img style={{ width: '150px' }} src={logo} alt="" />
                </Typography>

                {
                    window.innerWidth <= 960 &&
                    <Grid item xs={6}>
                        <p style={{ textAlign: 'right', cursor: 'pointer', color: 'blue' }}
                            onClick={() => setOpenMenu(!openMenu)} className='hamb'>
                            <MenuIcon></MenuIcon>
                        </p>
                    </Grid>
                }

                <Grid container xs={12} md={8} alignItems='center' justify="space-between" spacing={1} style={{ paddingRight: '10px' }}>




                    {
                        window.innerWidth > 960 || openMenu ?
                            <>
                                <Grid xs={12} md={1}><Link className="nav-link" to="/home">Home</Link></Grid>
                                <Grid xs={12} md={1}><Link className="nav-link" to="/home">Donation</Link></Grid>
                                <Grid xs={12} md={1}><Link className="nav-link" to="/events">Events</Link></Grid>
                                <Grid xs={12} md={1}><Link className="nav-link" to="/home">Blog</Link></Grid>
                            </>
                            : ''
                    }

                    {
                        window.innerWidth > 960 || openMenu ?
                            <>
                                {
                                    loggedInUser.email || loggedInUser.name
                                        ? <Grid xs={12} md={1}><b className="nav-link">{loggedInUser.name || 'User'}</b></Grid>
                                        : <Grid xs={12} md={1}>
                                            <Link className="nav-link" style={{ textDecoration: 'none', color: 'white' }} to="/registration-form">
                                                <Button variant="contained" color="primary">Register</Button>
                                            </Link>
                                        </Grid>
                                }
                            </>
                            : ''
                    }

                    {
                        window.innerWidth > 960 || openMenu ?
                            <>
                                <Grid xs={12} md={1}>
                                    <Link className="nav-link" style={{ textDecoration: 'none' }} to="/admin">
                                        <Button variant="contained" style={{ background: '#434141', color: 'white' }}>Admin</Button>
                                    </Link>
                                </Grid>
                            </>
                            : ''
                    }



                </Grid>
            </Grid>
        </ >
    );
};

export default Header;