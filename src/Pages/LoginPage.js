import React, {Fragment, useState, useContext} from 'react'
// import backgroundlogo from 'D:/webshowcase-frontend-combined/src/image/Binuslogo.png';
import logo from 'D:/webshowcase-frontend-combined/src/image/Binuslogo.png'
// import './App.css';
import './LoginPage.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Grid, Paper, TextField} from '@material-ui/core'
import { makeStyles, ThemeProvider,createMuiTheme } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";
import axios from 'axios'
import { AuthContext } from '../App'


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
const qs = require('querystring')
const api = 'http://127.0.0.1:3000'
  
function parseJwt(access_token){
    if (!access_token) {return;}
    const base64Url = access_token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

function LoginPage(props) {

  const {dispatch,state} = useContext(AuthContext)

    const initialState = {
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }

    const [data, setData] = useState(initialState)

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        const requestBody = {
            email: data.email,
            password: data.password
        }


        const config = {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' + state.access_token
            }
        }

        axios.post(api + '/api/v1/user/login', qs.stringify(requestBody),config)
        .then(res=>{
            if(res.data.success === true){
                dispatch({
                    type: "LOGIN",
                    payload: res.data
                })

                props.history.push("/Dashboard")
                console.log(parseJwt(state.access_token))
                
                localStorage.setItem('token',res.data.access_token)
                console.log(state.access_token)
            }
            else {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: res.data.message
                })
            }


            throw res
        })
    }
  const classes = useStyles();

return (
  <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
            {/* <img src={backgroundlogo} className="App-logo" alt="logo" /> */}
          <Paper className={classes.greypaper} elevation={10}>
              <form className={classes.form} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                <Grid justify="center" alignItem="center" container spacing={2}>
                  <Grid item xs={6}>
                      <img src={logo} className={classes.logo} alt="logo" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                    id="Email" 
                    variant="outlined" 
                    className="email-text" 
                    type='email'
                    label='Email' 
                    placeholder='Email' 
                    name='email'                  
                    value={data.email}
                    onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="password"
                    variant="outlined" 
                    className="password-text" 
                    type="password"
                    label='Password' 
                    placeholder='Password'
                    name='password'
                    value={data.password}
                    onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
                <Grid>
                {data.errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {data.errorMessage}
                            </div>
                        )}
                </Grid>
                <Grid>
                  <Button disabled={data.isSubmitting} 
                  type='submit' 
                  variant="contained" 
                  color="primary" 
                  className={classes.submit}>
                      {data.isSubmitting ? (
                        "..Loading"
                        ):
                        (
                        "Login"
                        )
                        }
                    </Button>
                </Grid>
              </form>
              {/* <Link to="/DashboardLecturer" style={{ textDecoration: 'none' }}>
                <Button type='submit' variant="contained" color="primary" className={classes.submit} >
                    Login
                </Button>
              </Link> */}
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
