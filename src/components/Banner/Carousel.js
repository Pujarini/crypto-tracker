import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { trendingCoin } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import {Link} from 'react-router-dom';

import {numberWithCommas}from '../../helpers/helpers'


const useStyles = makeStyles(()=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white"
    }
}));

function Carousel() {
    const [trending, settrending] = useState([]);
    const {currency, symbol}= CryptoState();


   const fetchTrendingCoins = async()=>{
       const {data}= await axios.get(trendingCoin(currency));
    settrending(data);
   }

  

   useEffect(() => {
       fetchTrendingCoins()
   }, [currency])

    const classes= useStyles();


    const items = trending.map((coin)=>{
        let profit=coin?.price_change_percentage_24h.toFixed(2)>=0;
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}
                />
                <span style={{fontSize:22, fontWeight:500}}>
                    {coin?.symbol}&nbsp;
                    <span style={{color: profit >0 ? "green":"red"}}>{profit && "+"}{coin?.price_change_percentage_24h.toFixed(2)}%</span>
                </span>
                <span style={{fontSize:22, fontWeight:500}}>
                    {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 1,
        },
        1024: {
            items: 3
        }
      }
    return (
        <div className={classes.carousel}>
            <AliceCarousel mouseTracking autoPlayInterval={1000} infinite items={items}  responsive={responsive} disableDotsControls disableButtonsControls autoPlay/>
        </div>
    )
}

export default Carousel
