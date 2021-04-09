import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/Group 1329.png';
// import { GroupAddIcon } from '@material-ui/icons/GroupAdd';
// import AddIcon from '@material-ui/icons/Add';

const SideBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        setLoggedInUser({ ...loggedInUser, clicked: 'helpList' })
    }, [])

    return (
        <Grid container item style={{ marginTop: '15px', marginLeft: '15px' }}>
            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                <Link to="/">
                    <img style={{ height: '50px' }} src={logo} alt="" />
                </Link>
            </Grid>

            <Grid container item xs={12} md={9} alignItems="center" style={{}}>
                <Button onClick={() => setLoggedInUser({ ...loggedInUser, clicked: 'helpList' })} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', border: 'none', background: 'none' }}>
                    <div>
                        <b>Registration List</b>
                    </div>
                </Button>
                <Button onClick={() => setLoggedInUser({ ...loggedInUser, clicked: 'addEvent' })} style={{ marginBottom: '10px', border: 'none', background: 'none' }}>
                    <div>
                        <b>Add Event </b>
                    </div>
                </Button>
            </Grid>
        </Grid>
    );
};

export default SideBar;