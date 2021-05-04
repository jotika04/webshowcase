import React, { Component ,useState} from "react";
import backgroundlogo from 'E:/React Projects/my-app/src/image/Binuslogo.png';
import logo from 'E:/React Projects/my-app/src/image/Binuslogo.png'
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {Grid, Paper, TextField} from '@material-ui/core'
import { makeStyles, ThemeProvider,createMuiTheme } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors';


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
        height: '900px',
        width:'700px',
        margin:"auto 300px",
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
  

function SubmissionPage(props) {

    const classes = useStyles();
    const [data, setData]=useState();
    const [print, setPrint]=useState(false);
    const [projectname,setProjectName] = useState("");
    const [major,setMajor] = useState("");
    const [classcode,setClassCode] = useState("");
    const [description,setDescription] = useState("");

    function getData(val)
    {
    setData(val.target.value)
    console.warn(val.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (projectname && major && classcode && description){
            console.log(projectname,major,classcode,description)
        }
    }

    const getfile = (e) => {
        let files = e.target.files;
        console.warn("data file",files)
    }
    const getFile = (e) => {
        getfile();
    }
  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            {/* <img src={backgroundlogo} className="App-logo" alt="logo" /> */}
            <Paper className={classes.greypaper} elevation={10}>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <Grid justify="center" alignItem="center" container spacing={1}>
                    <Grid item xs={4}>
                      <img src={logo} className={classes.logo} alt="logo" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        id="username" 
                        variant="outlined" 
                        lassName="name-text" 
                        label='Project name' 
                        placeholder='Project name' 
                        fullWidth 
                        onChange={(e) => setProjectName(e.target.value)}
                        // error={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        id="password" 
                        variant="outlined" 
                        className="email-text" 
                        label='Major' 
                        placeholder='Major' 
                        required 
                        fullWidth 
                        onChange={(e) => setMajor(e.target.value)}
                        // error={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        id="password" 
                        variant="outlined" 
                        className="password-text" 
                        label='Class' 
                        placeholder='Class' 
                        required 
                        fullWidth 
                        onChange={(e) => setClassCode(e.target.value)}
                        // error={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        id="password" 
                        variant="outlined"
                        className="confirm-text" 
                        label='Project Description' 
                        placeholder='Description'
                        required
                        fullWidth
                        multiline 
                        rows='20' 
                        onChange={(e) => setDescription(e.target.value)}
                        // error={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div >
                            <input type="file" name="file" onChange={props.getfile}/>
                        </div>
                    </Grid>
                  </Grid>
                </form>
                

            </Paper>
        </div>
        </Container>
    </ThemeProvider>
  );
}

export default SubmissionPage;
