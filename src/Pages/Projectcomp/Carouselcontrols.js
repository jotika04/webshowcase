import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";

const styles = theme => ({
  root: {
    display: "flex",
    height: 40,
    top: -130,
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    width: 15,
    height: 15,
    backgroundColor: theme.palette.background.paper,
    marginRight: 5
  },
  active: {
    width: 20,
    height: 20
  }
});

const Carouselcontrols = ({
  classes,
  itemsnumber,
  index,
  handleChangeIndex
}) => {
  return (
    <div className={classes.root}>
      {[...Array(itemsnumber).keys()].map((item, i) => (
        <Paper
          className={classNames({
            [classes.item]: true,
            [classes.active]: i === index
          })}
          key={i}
          elevation={12}
          onClick={() => handleChangeIndex(i)}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(Carouselcontrols);
