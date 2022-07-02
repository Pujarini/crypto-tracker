import { Container, createTheme , Paper, TableContainer, TableHead, TextField, ThemeProvider, Typography, Table,TableRow,TableCell, CircularProgress, TableBody, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from '../helpers/helpers';


function CoinsTable() {
    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState("");
    const [page, setpage] = useState(1)
    const history= useHistory();

    const {currency, symbol}= CryptoState();

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchCoinsList = async()=>{
        setloading(true);
        const {data}= await axios.get(CoinList(currency));
        setcoins(data);
        setloading(false);
    }

    useEffect(()=>{
        fetchCoinsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency]);

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    })

    const handleSearch = ()=>{
        return coins.filter(coin => coin.name.toLowerCase().includes(search)|| coin.symbol.name.toLowerCase().includes(search))
    }

    const useStyles = makeStyles(()=>({
        row:{
            backgroundColor:"#16171a",
            cursor:"pointer",
            "&:hover":{
                backgroundColor:"#131111"
            },
            fontFamily:"Montserrat"
        },
        pagination:{
            "&.MuiPaginationItem-root":{
                color:"gold"
            }
        }
    }))

    const classes= useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign:"center"}}>
                <Typography variant="h4" style={{margin:18,fontFamily:"montessarat"}}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label="Search for a crypto currency" variant="outlined" style={{width:'100%',marginBottom:"5%"}} onChange={(e)=> setsearch(e.target.value)} value={search}></TextField>
                <TableContainer component={Paper}>
                    <Table>
                        {loading ? <CircularProgress/> : (
                            <>
                            <TableHead>
                                <TableRow style={{backgroundColor:"#EEBC1D"}}>
                                    {["Coin","Price","24h Change","Market Cap"].map(head=>(
                                        <TableCell style={{color:"black", fontWeight:700, fontFamily:"Montserrat"}} key={head} align={head === "Coin" ? "":"right"}>
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page-1)*10,(page-1)*10+10).map(row=>{
                                    const profit= row.price_change_percentage_24h > 0;
                                    return(
                                        <TableRow onClick={()=> history.push(`/coins/${row.id}`)} className={classes.row} key={row.name}>
                                            <TableCell component="th" scope="row" styles={{display:"flex",gap:15}}>
                                                    <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}}/>
                                                    <div style={{display:"flex",flexDirection:"column"}}>
                                                        <span style={{textTransform:"uppercase", fontSize:22}}>
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{color:"darkgray"}}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{""}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell 
                                                align="right"
                                                style={{color:profit > 0 ? "green":"red", fontWeight:500}}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h}%
                                                </TableCell>
                                                <TableCell align="right">
                                                {symbol}{""}
                                                {numberWithCommas(row.market_cap.toString().slice
                                                (0,-6))}M
                                                </TableCell>
                                            </TableRow>
                                    )
                                })}
                            </TableBody>

                            </>
                        ) }
                    </Table>
                </TableContainer>
                <Pagination style={{padding:20, width:"100%", display:"flex", justifyContent:"center"}} classes={{ul:classes.pagination}} count={(handleSearch()?.length/10).toFixed(0)}
                onChange={(_,value)=>{
                    setpage(value);
                    window.scroll(0,450)
                }}
                />
            </Container>

        </ThemeProvider>
    )
}

export default CoinsTable;
