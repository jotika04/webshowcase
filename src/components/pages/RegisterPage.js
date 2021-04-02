import React from "react";
import ReactDOM from 'react-dom'

import backgroundlogo from 'C:/Users/Ryo/webshowcase/src/image/site-logo.png';
import logo from 'C:/Users/Ryo/webshowcase/src/image/binus-logo.png'
// import './App.css';
import './RegisterPage.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Grid, Paper, TextField} from '@material-ui/core'
import { makeStyles, ThemeProvider,createMuiTheme } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from "@material-ui/core/Typography";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'



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
      }
    },
    paper:{
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
        height: '600px',
        width:'500px',
        margin:"300px auto",
        backgroundColor: grey[300],
        borderRadius: 10,
        overflow: 'hidden',

      },
      customBorder: {
        border : `3px solid ${grey [200]}`
      },
      form: {
        width:'100%',
        marginTop: theme.spacing(3),
      },
      submit:{
        margin : theme.spacing(3,0,2)
      },
      logo:{
        // margin: theme.spacing(1),
        justify:'center',
        height:'73px',
        width:'122px',
        left:'200px'
      },
  }));
function RegisterPage() {
    const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <img src={backgroundlogo} className="App-logo" alt="logo" />
            <Paper className={classes.greypaper} elevation={10}>
                <form className={classes.form} noValidate autoComplete="off">
                  <Grid justify="center" alignItem="center" container spacing={1}>
                    <Grid item xs={4}>
                      <img src={logo} className={classes.logo} alt="logo" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="username" variant="outlined" className="name-text" label='Name' placeholder='Name' fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" variant="outlined" className="email-text" type='email' label='Email' placeholder='Email' required fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" variant="outlined" className="password-text" type='password' label='Password' placeholder='Password' required fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" variant="outlined" className="confirm-text" type='password' label='Confirm Password' placeholder='Confirm Password' required fullWidth/>
                    </Grid>
                   {/*CHECKBOX*/}
                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="Guest login"/>
                    </Grid> */}
                  </Grid>
                </form>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button type='submit' variant="contained" color="primary" className={classes.submit} fullWidth>
                        Register
                    </Button>
                </Link>
                <Typography align="right"> Already registered?
                  <a href='/loginpage'>
                    Login
                  </a>
                </Typography>
            </Paper>
        </div>
        </Container>
    </ThemeProvider>
  );
}

export default RegisterPage;
