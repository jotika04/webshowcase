import React from "react";
import backgroundlogo from 'C:/Users/Ryo/webshowcase/src/image/site-logo.png';
import logo from 'C:/Users/Ryo/webshowcase/src/image/binus-logo.png'
// import './App.css';
import './LoginPage.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Grid, Paper, TextField} from '@material-ui/core'
import { makeStyles, ThemeProvider,createMuiTheme } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";


const theme = createMuiTheme({
    palette:{
      primary: {
        main: blue[700],
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
        marginLeft : 0,
        top:50,
        padding:'170px 200px'
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
      },
      paper:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      form: {
        width:'100%',
        marginTop: theme.spacing(3),
      },
      logo:{
        margin: theme.spacing(1),
        height:'73px',
        width:'122px',
        left:'200px'
      },
      submit:{
        margin : theme.spacing(3,0,2),
        left:'40px',
        height:'38px',
        width:'240px',
      },
  }));
  function LoginPage() {
    const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <img src={backgroundlogo} className="App-logo" alt="logo" />
            <Paper className={classes.greypaper} elevation={10}>
                <form className={classes.form} noValidate autoComplete="off">
                  <Grid justify="center" alignItem="center" container spacing={2}>
                    <Grid item xs={6}>
                      <img src={logo} className={classes.logo} alt="logo" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="username" variant="outlined" className="text-field-user" label='Name' placeholder='Name' />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" variant="outlined" className="text-field-pass" type='password' label='Password' placeholder='Password'/>
                    </Grid>
                  </Grid>
                </form>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button type='submit' variant="contained" color="primary" className={classes.submit} >
                      Login
                  </Button>
                </Link>
                <Typography align="center">Don't have an account? 
                  <a href='/registerpage'>
                    Register
                  </a>
                </Typography>
            </Paper>
        </div>
        </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
