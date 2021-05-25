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
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,}
    },

});

function MusicCard(props) {
  const { classes } = props;

  return (

      
        
          <iframe
            id="video"
            // className={classes.mainFeaturedPostContent}
            
            src={"https://www.youtube.com/embed/" + props.data.videoId}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        
 
      

  );
}

MusicCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MusicCard);
