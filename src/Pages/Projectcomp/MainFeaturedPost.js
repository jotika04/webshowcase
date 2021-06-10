import React, { Component } from "react";
import { db } from "../Projectcomp/db";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MusicCard from "../Projectcomp/MusicCard";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12),
      // paddingRight: 0,
    },
  }
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper className={classes.mainFeaturedPost} >
      {/* Increase the priority of the hero background image */}
      
      <div className={classes.overlay} />

          <div className={classes.mainFeaturedPostContent}>
            {/* <h1>Just some static data here</h1>
            <p>some static description</p> */}
            <MusicCard
            align="center"
            data={db.alternative[1]}
            
            />
            <h1>ASDASDADASASDd</h1>
          </div>


    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};