import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    // root: {
    //     maxWidth: 345,
    // },
    media: {
        height: 200,
    },
});

const EventCard = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, img } = props.event;
    const history = useHistory();
    const classes = useStyles();

    const handleEvent = () => {
        setLoggedInUser({ ...loggedInUser, event: props.event })
        history.push('/registration-form')
    }

    return (
        <>
            <Card style={{ background: props.myColor }}>
                <CardActionArea>
                    <CardMedia
                        onClick={handleEvent}
                        className={classes.media}
                        image={img}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default EventCard;