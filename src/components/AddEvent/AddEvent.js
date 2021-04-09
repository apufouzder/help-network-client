import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
// import axios from 'axios';

const AddEvent = () => {
    const [imageURL, setImageURL] = useState(null);
    const [myEvent, setMyEvent] = useState({ date: new Date().toDateString(), img: imageURL })
    const history = useHistory()

    const addEventHandler = () => {
        fetch('http://localhost:3010/add-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(myEvent)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    history.push('/')
                }
                // console.log(result);
            })
    }
    // const classes = useStyles();
    // const { register, handleSubmit, watch, errors } = useForm();

    // const onSubmit = data => {
    //     console.log(data);
    //     const eventData = {
    //         title: data.title,
    //         description: data.description,
    //         date: data.date,
    //         imageURL: data.imageURL
    //     };

    //     const url = `http://localhost:3010/addEvent`;
    //     fetch(url, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(eventData)
    //     })
    //         // .then(res => res.json())
    //         .then(data => {
    //             console.log('server res', data);
    //         })
    // };

    // const handleUploadImage = event => {
    //     const imageData = new FormData();
    //     imageData.set('key', '46f0ffc881fb748293fdf8b93dce6295');
    //     imageData.append('image', event.target.files[0])

    //     axios.post('https://api.imgbb.com/1/upload', imageData)
    //         .then(res => {
    //             console.log('res', res);
    //             setImageURL(res.data.data.display_url);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }


    return (
        <>
            <Grid item xs={12} md={9} style={{ marginTop: '15px', padding: '20px', height: '100vh' }} >
                <h2 style={{ color: '#0C0C0C' }}>
                    <span style={{ color: '#3f51b5' }}>Add </span> Event
                </h2>
                <Grid container item xs={12} style={{ padding: '20px', marginTop: '25px', boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)', borderRadius: '10px' }}>
                    <Grid item xs={12} sm={6} >
                        <div>
                            <b>Event title</b>
                            <input
                                onBlur={(event) => setMyEvent({ ...myEvent, name: event.target.value })}
                                placeholder='Enter title'
                                style={{
                                    outline: 'none',
                                    background: 'ghostwhite',
                                    width: '80%',
                                    height: '28px',
                                    fontSize: '16px',
                                    border: '1px solid #dfdfdf',
                                    borderRadius: '5px',
                                    margin: '14px 0',
                                    padding: '3px 10px'
                                }}
                                id='title'
                                type="text"
                            />
                        </div>
                        <div>
                            <b>Description</b><br />
                            <textarea
                                onBlur={(event) => setMyEvent({ ...myEvent, description: event.target.value })}
                                placeholder='Enter description'
                                name="description"
                                style={{
                                    outline: 'none',
                                    background: 'ghostwhite',
                                    width: '80%',
                                    margin: '14px 0',
                                    fontSize: '16px',
                                    border: '1px solid #dfdfdf',
                                    borderRadius: '5px',
                                    padding: '5px 10px'
                                }}
                                id="description"
                                rows="7">
                            </textarea>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div>
                            <b>Event date</b><br />
                            <input
                                onBlur={(event) => setMyEvent({ ...myEvent, date: new Date(event.target.value).toDateString() })}
                                type='date'
                                id='date'
                                style={{
                                    outline: 'none',
                                    width: '80%',
                                    background: 'ghostwhite',
                                    height: '28px',
                                    fontSize: '16px',
                                    border: '1px solid #dfdfdf',
                                    borderRadius: '5px',
                                    margin: '14px 0',
                                    padding: '3px 10px'
                                }}
                            />
                        </div>
                        <div>
                            <b>Add Image</b><br />
                            <input
                                onBlur={(event) => setMyEvent({ ...myEvent, img: event.target.value })}
                                placeholder='Paste your image link'
                                type='text'
                                id='date'
                                style={{
                                    outline: 'none',
                                    width: '80%',
                                    background: 'ghostwhite',
                                    height: '28px',
                                    fontSize: '16px',
                                    border: '1px solid #dfdfdf',
                                    borderRadius: '5px',
                                    margin: '14px 0',
                                    padding: '3px 10px'
                                }}
                            />
                        </div>
                        <div>
                            {/* <b>Banner</b><br />
                            <div className='file-upload'
                                style={{ background: `url(${upload}) no-repeat`, backgroundSize: '30px 30px' }}>
                                
                                <b style={{ color: '#0084FF', margin: '0' }}>Upload image</b>
                            </div>
                            <input onChange={handleUploadImage} type="file" /> */}

                        </div>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={addEventHandler}
                    style={{ float: 'right', height: '40px', margin: '20px', padding: '15px 30px' }}>
                    <strong>Submit</strong>
                </Button>
            </Grid>
        </>
    );
};

export default AddEvent;