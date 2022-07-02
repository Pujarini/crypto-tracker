import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {HistoricalChart} from '../config/api'
import {CryptoState} from '../CryptoContext';
import {CircularProgress, createTheme, makeStyles, ThemeProvider} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/chartDays';
import SelectButton from './SelectButton';

const CoinInfo = ({coin}) => {
    const [historicData, sethistoricData] = useState();
    const [days, setdays] = useState(1);
    const [loading, setloading] = useState(false);
    const [flag,setflag] = useState(false);
    const{currency}= CryptoState();


    const fetchHistoricData = async()=>{
        const {data}= await axios.get(HistoricalChart(coin.id,days,currency))
        setloading(true);
        setflag(true);
        sethistoricData(data.prices);
    }

    useEffect(()=>{
        fetchHistoricData();
    },[currency,days]);

    const darkTheme = createTheme({
        palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
        },
    });

    const useStyles= makeStyles((theme)=>({
        container:{
            width:"75%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            marginTop:25,
            padding:40,
            [theme.breakpoints.down("md")]:{
                width:"100%",
                marginTop:0,
                padding:20,
                paddingTop:0
            }
        }
    }));
    console.log("historicData", !historicData | flag===false );
    const classes = useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
           <div className={classes.container}>
               {!historicData | flag===false  ? <CircularProgress style={{color:"gold"}} thickness={1} size="250"/>:<>
              <Line data={{
                   labels: historicData.map((coin)=>{
                       let date= new Date(coin[0]);
                       let time = date.getHours() > 12 ? `${date.getHours()-12}:${date.getMinutes()} PM`: `${date.getHours()}:${date.getMinutes()} AM`;
                       console.log(date.toLocaleDateString(),"date");
                       return days===1 ? time : date.toLocaleDateString();
                   }),
                   datasets:[{
                       data:historicData.map((coin)=> coin[1]),
                       label:`Price (Past ${days} days) in ${currency}`,
                       borderColor:"#EEBC1D"
                   }]
                }} options={{elements:{
                    point:{
                        radius:1
                    }
                }}}>
                   </Line>

                   {chartDays.map(day=>{
                       return(
                        <SelectButton key={day.value} style={{display:"flex", flexDirection:"column",marginTop:20,justifyContent:"space-around",width:"25%"}} onClick={()=>{setdays(day.value); setloading(false); setflag(false)}} selected={day.value === days}>{day.label}</SelectButton>
                       )
                      
                   })}

               </>}

           </div>
        </ThemeProvider>
    )
}

export default CoinInfo
