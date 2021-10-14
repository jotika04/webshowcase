import React, { useState } from "react";


import backgroundlogo from 'D:/webshowcase-frontend-combined/src/image/Binuslogo.png';
import logo from 'D:/webshowcase-frontend-combined/src/image/Binuslogo.png'
// import './App.css';
import './RegisterPage.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
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
const RegisterPage = () => {
    const classes = useStyles();

    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[userfirstname,setUserFirstName] = useState('');
    const[userlastname,setUserLastName]= useState('');
    const[password,setPassword] = useState('');
    
    const[redirect,setRedirect] = useState(false);

    const submit = async(e) =>{
      e.preventDefault();

      await fetch("http://127.0.0.1:3000/api/v1/user/register", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          username,
          email,
          userfirstname,
          userlastname,
          password
        })
      });
      setRedirect(true);
      console.log("a");
    }
  
    if(redirect){
      return <Redirect to ="/LoginPage"/>
    }

  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            {/* <img src={backgroundlogo} className="App-logo" alt="logo" /> */}
            <Paper className={classes.greypaper} elevation={10}>
                <form className={classes.form} noValidate autoComplete="off">
                  <Grid justify="center" alignItem="center" container spacing={2}>
                    <Grid item xs={4}>
                      <img src={logo} className={classes.logo} alt="logo" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="username" variant="outlined" className="name-text" label='Username' placeholder='Username' fullWidth 
                      required onChange = {e => setUsername(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" variant="outlined" className="email-text" type='email' label='Email Address' placeholder='Email address' 
                      required fullWidth onChange = {e => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="userfirstname" variant="outlined" className="name-text" label='First Name' placeholder='First Name'  
                      required fullWidth onChange = {e => setUserFirstName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="userlastname" variant="outlined" className="name-text" label='Last Name' placeholder='Last Name'  
                      required fullWidth onChange = {e => setUserLastName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" variant="outlined" className="password-text" type='password' label='Password' placeholder='Password' 
                      required fullWidth onChange = {e => setPassword(e.target.value)}/>
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
                      <Link to="/frontlogin" style={{ textDecoration: 'none' }}>
                      <Button type='submit' variant="contained" color="primary" className={classes.submit} fullWidth onClick={submit}>
                        Register
                      </Button>
                      </Link>
                    </Grid>
                </form>
                <Typography align="right"> Already registered ?
                  <a href='/loginpage'>
                    Click here to login
                  </a>
                </Typography>
            </Paper>
        </div>
        </Container>
    </ThemeProvider>
  );
}

export default RegisterPage;
