import React from 'react';
import PropTypes from 'prop-types';
import { db } from "../Projectcomp/db";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MusicCard from "../Projectcomp/MusicCard";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function ProjectDescription(props) {
  const classes = useStyles();
  const { post, posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {/* {posts} */}
      <Typography variant="h5" gutterBottom>
        Definition and synonyms of of any description from the online English dictionary from Macmillan Education.

        This is the British English definition of of any description.View American English definition of of any description.

        Change your default dictionary to American English.
      </Typography>
        {/* <MusicCard
            align="center"
            data={db.alternative[1]}
            /> */}
    </Grid>
  );
}

ProjectDescription.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
  post : PropTypes.object,
};