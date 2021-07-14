import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { db } from "../Projectcomp/db";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MusicCard from "../Projectcomp/MusicCard";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import axios from "axios";


function pxToRem(value) {
  return `${value / 16}rem`;
}

const breakpoints = createBreakpoints({});
  const theme = createMuiTheme({
    breakpoints,
    overrides: {
      MuiTypography: {
        headline: {
          fontSize: pxToRem(24),
          [breakpoints.up("md")]: {
            fontSize: pxToRem(32)
          }
        },
        title: {
          fontSize: pxToRem(21),
          [breakpoints.up("md")]: {
            fontSize: pxToRem(24)
          }
        },
        body1: {
          fontSize: pxToRem(14),
  
          [breakpoints.up("md")]: {
            fontSize: pxToRem(16)
          }
        },
        body2: {
          fontSize: pxToRem(14),
          [breakpoints.up("md")]: {
            fontSize: pxToRem(16)
          }
        },
        button: {
          fontSize: pxToRem(14),
          [breakpoints.up("md")]: {
            fontSize: pxToRem(16)
          }
        }
      }
    }
  });
  
const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  root: {
    width: "100%",
    maxWidth: 650
  },

  
  // Generate breakpoints so we can use them in the theme definition
  
  
}));

export default function ProjectDescription() {
  const classes = useStyles();
  // const { title } = props;
  const url = 'https://ghibliapi.herokuapp.com/films'
  
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(url).then(json => setData(json.data))
  }, [])

  return (
    <Grid item xs={12} md={8}>
      <div className={classes.root}>

      <Typography variant="h4" gutterBottom>
        Description
      </Typography>
      <Divider />
      {/* {posts} */}
      <Typography justify="center" gutterBottom>
        Definition and synonyms of of any description from the online English dictionary from Macmillan Education.

        This is the British English definition of of any description.View American English definition of of any description.

        Change your default dictionary to American English.
        
      </Typography>
      </div>
    </Grid>
  );
}

// ProjectDescription.propTypes = {
//   posts: PropTypes.array,
//   title: PropTypes.string,
//   post : PropTypes.object,
// };