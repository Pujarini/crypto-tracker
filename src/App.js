import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CoinPage from './components/CoinPage';
import Header from './components/Header';
import 'react-alice-carousel/lib/alice-carousel.css';
import { makeStyles } from '@material-ui/core';

function App() {
  const useStyles= makeStyles(()=>({
    App:{
      backgroundColor:'#14161a',
      color:'white',
      minHeight:"100vh"
    }
  }))

  const classes= useStyles()
  return (
    <div className={classes.App}>
      <BrowserRouter>
      <Header/>
      <Route path="/" component={HomePage} exact/>
      <Route path="/coins/:coinId" component={CoinPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
