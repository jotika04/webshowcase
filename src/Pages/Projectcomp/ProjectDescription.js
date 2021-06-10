import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { db } from "../Projectcomp/db";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MusicCard from "../Projectcomp/MusicCard";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
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
      <Typography variant="h4" gutterBottom>
        Description
      </Typography>
      <Divider />
      {/* {posts} */}
      <Typography variant="h5" gutterBottom>
        Definition and synonyms of of any description from the online English dictionary from Macmillan Education.

        This is the British English definition of of any description.View American English definition of of any description.

        Change your default dictionary to American English.
        
      </Typography>
    </Grid>
  );
}

// ProjectDescription.propTypes = {
//   posts: PropTypes.array,
//   title: PropTypes.string,
//   post : PropTypes.object,
// };