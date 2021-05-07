import React from 'react';
import clsx from 'clsx';
import {CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Container, Card, 
 CardHeader, Avatar, IconButton,  Badge, Menu, MenuItem,  Divider, Icon } from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import {  green, lightBlue, red } from '@material-ui/core/colors';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SidebarLecturer from './components/SidebarLecturer';


const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    maxWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: lightBlue[500],
  },
  avatarverified: {
    backgroundColor: green[500],
  },
  avatarreject: {
    backgroundColor: red[500],
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logobinus:{
    margin: theme.spacing(1),
    height:'73px',
    width:'122px',
    left:'200px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}));

const cards = [1, 2, 3, 4, 5, 6 ];

export default function Verification() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);



  

  return (
    <React.Fragment>
      <CssBaseline />
      <SidebarLecturer/>
      <main>
        {/* The Projects */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="intherit" gutterBottom>
              Verification
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} justify="space-evenly">
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={10} md={4}>
                <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar  className={classes.avatar}>
            <AccountCircle/>
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Students"
        subheader="September 14, 2020"
      />
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Verified at: pending
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}

        >
          <CheckCircleOutlineIcon />
        </IconButton>
      </CardActions>
    </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Divider variant="middle"/>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} justify="space-evenly">
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={10} md={4}>
                <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar  className={classes.avatarverified}>
            <AccountCircle/>
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Students"
        subheader="September 14, 2020"
      />
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Verified at: September 16. 2020
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <Icon
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}

        >
          <CheckCircleIcon />
        </Icon>
      </CardActions>
    </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Divider variant="middle"/>

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} justify="space-evenly">
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={10} md={4}>
                <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar  className={classes.avatarreject}>
            <AccountCircle/>
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Students"
        subheader="September 14, 2020"
      />
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Rejected at: September 16, 2020
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <Icon
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}

        >
          <CancelIcon />
        </Icon>
      </CardActions>
    </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Divider variant="middle"/>

      </main>
    </React.Fragment>
  );
}