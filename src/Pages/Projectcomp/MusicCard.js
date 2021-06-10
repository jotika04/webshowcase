import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  
  
  mainFeaturedPostContent: {
    position: 'relative',
    // padding: theme.spacing(4),
    width: '675px',
    height: '425px',
    
    // paddingLeft: '50px',
    // paddingBottom: '50px',
    [theme.breakpoints.up('md')]: {
      // padding: theme.spacing(12),
      }
    },
});

function MusicCard(props) {
  const { classes } = props;

  return (
          <iframe
            id="video"
            className={classes.mainFeaturedPostContent}
            
            src={"https://www.youtube.com/embed/" + props.data.videoId}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            // style={{padding-left= 20px,padding-top=20px","padding-bottom:20px","width: 520px",height:340px,}}
          />
        );
      }

MusicCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MusicCard);
