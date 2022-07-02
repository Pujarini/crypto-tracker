import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

const useStyles= makeStyles(()=>({
    banner:{
            backgroundImage:"url(./banner1.jpeg)"
    },
    bannerContent:{
        display:"flex",
        flexDirection:'column',
        height:400,
        paddingTop:25,
        justifyContent:"space-around"
    },
    tagLine:{
            display:"flex",
            flexDirection:"column",
            height:"40%",
            justifyContent:"center",
            textAlign:"center"
    }
}))

function Banner() {

    const classes=useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagLine}>
                    <Typography variant="h2" style={{
                        fontWeight:500,
                        fontFamily:"Montserrat"
                    }}>
                    Crypto Watcher
                    </Typography>
                    <Typography variant="subtitle2" style={{
                        color:'gold',
                        fontFamily:"Montserrat",
                        fontWeight:500
                    }}>
                    You can get all your information about crypto currency here
                    </Typography>
                    <Carousel/>  
                </div>
            </Container>
        </div>
    )
}

export default Banner;
