import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function ProjectDescription(props) {
  const classes = useStyles();
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {/* {posts} */}
      <Typography variant="p" gutterBottom>
      Definition and synonyms of of any description from the online English dictionary from Macmillan Education.

        This is the British English definition of of any description.View American English definition of of any description.

        Change your default dictionary to American English.
      </Typography>
    </Grid>
  );
}

ProjectDescription.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};