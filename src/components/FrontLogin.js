import React from "react";
import ReactDOM from 'react-dom'

import backgroundlogo from 'C:/Users/Ryo/webshowcase/src/image/site-logo.png';
import logo from 'C:/Users/Ryo/webshowcase/src/image/binus-logo.png'
// import './App.css';
import './FrontLogin.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Grid, Paper} from '@material-ui/core'
import { makeStyles, ThemeProvider,createMuiTheme } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const theme = createMuiTheme({
  palette:{
    primary: {
      main: blue[600],
    }
  },
  typography:{
    fontFamily:[
      "sans-serif"
    ]
  }
})

const useStyles = makeStyles((theme) => ({
  root:{
    "& > *": {
      // padding : 20,
      // height: '70vh',
      // width:280,
      // margin:"20px auto"
    }
  },
    bluepaper: {
      padding : 25,
      height: '300px',
      width:300,
      margin:"300px auto",
      backgroundColor: blue[300],
      borderRadius: 10
    },
    greypaper: {
      padding : 25,
      height: '372px',
      width:'329px',
      margin:"300px auto",
      backgroundColor: grey[300],
      borderRadius: 10,
      overflow: 'hidden',
    },
    customBorder: {
      border : `3px solid ${grey [200]}`
    }
}));


function Frontlogin() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <div className="classes.root">
          <img src={backgroundlogo} className="App-logo" alt="logo" />
            <Paper className={classes.greypaper} elevation={10}>
              <img src={logo} className="binus-logo" alt="logo" />
              <Link to="/loginpage" style={{ textDecoration: 'none' }} className="nav-links">
                <Button variant="contained" color="primary" className="button-login">
                  Login
                </Button>
              </Link>
              <Link to="/registerpage" style={{ textDecoration: 'none' }} className="nav-links">
                <Button variant="contained" color="primary" className="button-register">
                  Register
                </Button>
              </Link>
            </Paper>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Frontlogin;