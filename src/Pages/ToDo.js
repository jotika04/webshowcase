import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Projectinfo from "./Projectinfo";
import { Block } from "@material-ui/icons";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    width: "auto",
    height: "auto",
  },
  testroot: {
      height: "1000px",
      position: "relative",
      overflow: "auto"
    //   display: "inline-block",
  }
}));

export default function ToDo() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
      >
        Overlay testing
      </button>
      <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
        {/* <CircularProgress color="inherit" /> */}
        {/* <Paper>
            <Projectinfo/>
        </Paper> */}
        <Card className={classes.testroot}>
            <Projectinfo/>
        </Card>

      </Backdrop>
    </div>
  );
}
