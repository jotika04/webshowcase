import React, {useState, useEffect} from 'react'
import axios from 'axios'
import clsx from 'clsx';
import {CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Container, Card, 
   CardHeader, Avatar, IconButton, Badge, Menu, MenuItem, ButtonBase, } 
  from '@material-ui/core';
  import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
  import { lightBlue } from '@material-ui/core/colors';
  import FavoriteIcon from '@material-ui/icons/Favorite';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import AccountCircle from '@material-ui/icons/AccountCircle';
  import MailIcon from '@material-ui/icons/Mail';
  import NotificationsIcon from '@material-ui/icons/Notifications';
  import CommentIcon from '@material-ui/icons/Comment';
  import SidebarLecturer from './components/SidebarLecturer';
  import Button from '@material-ui/core/Button'
  import Modal from "@material-ui/core/Modal";
  import Dialog from "@material-ui/core/Dialog"
  import Projectinfo from "./Projectinfo";
  import {  Link } from 'react-router-dom';
  import { SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
  
  const drawerWidth = 240;
  
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" >
        Copyright © Computer Science Program, Faculty of Computing and Media,<br/> Binus University International 2021
      </Typography>
    );
  }
  
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
    height: 400,
    // overflow:"auto",
    // textOverflow:"ellipsis"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', 
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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    whiteSpace: "nowrap"
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    // marginLeft: "100px",
    // marginRight: "100px"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '50%', 
    overflow: "auto"
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  backdrop: {
    fullWidth: "true",
    maxWidth: "xs",
  },
  testroot: {
      position: "relative",
      padding: theme.spacing(4, 4, 8),
      justify: "center",
      minHeight: "300px"
    
    //   display: "inline-block",
  },
  custombox: {
    display: "-webkit-box",
  }

}));


export default function Dashboard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>
          Profile
        </p>
        
      </MenuItem>
    </Menu>
  );
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openOverlay, setOpenOverlay] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const url = 'http://localhost:3000/DummyDatas'
  
  const [data, setData] = useState([])

  // useEffect(() => {
    
  //   axios.get(url)
  //  .then((res)=>{
  //    console.log(res.data);
  //  }).catch((err)=>{
  //    console.log(err);
  //  })

  // }, [])

  useEffect(() => {
    axios.get(url).then(json => setData(json.data))
  }, [])

      
  return (
    <React.Fragment>
      <CssBaseline />
      <SidebarLecturer/>
    
      <main>
        {/* The Projects */}
        <div className={classes.heroContent} >
          <Container maxWidth="sm" >
            <Typography component="h1" variant="h4" align="center" color="inherit" gutterBottom>
              Recommendation
            </Typography>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4} justify="space-evenly">
            {data.slice(0,8).map((data) => (
              <Grid item key={data.Project_name} xs={8} sm={6} md={4} lg={3} alignContent="center">
                <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AccountCircle/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.Project_name}
      />

      
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
    

      <CardContent className={classes.cardControl} >
        <Typography variant="body2" color="textSecondary" component="p">
        <p>{data.Description.length > 75 ?
              `${data.Description.substring(0,75)}...` : data.Description}</p>
        </Typography>
      </CardContent>

      {/* <CardActions disableSpacing> */}
          
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
         
        <Button type="button" onClick={handleOpen}>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
                <CommentIcon /> 
            </IconButton>
        </Button>
    </Card>
  </Grid>
            ))}
          </Grid>
        </Container>
          <Copyright/>
      </main>
      <Dialog
            fullWidth={true}
            maxWidth="md"
            className={classes.backdrop}
            open={open}
            onClose={handleClose}
      >
        
          <Grid>
            <Card className={classes.testroot}>
                <Projectinfo/>
            </Card>
          </Grid>
        
      </Dialog> 
    </React.Fragment>
  );
}