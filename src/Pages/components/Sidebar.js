import React from 'react';
import clsx from 'clsx';
import {CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Typography, Container, Card, 
  AppBar, CardHeader, Avatar, IconButton, InputBase, Badge, Menu, MenuItem, Drawer, List, Divider, 
  ListItem, ListItemIcon, ListItemText, InputLabel, FormControl, Select, ListSubheader } 
  from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {  Link } from 'react-router-dom';
import logo from 'E:/React Projects/my-app/src/image/Binuslogo.png';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';


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
    paddingTop: '56.25%', 
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


export default function Sidebar() {
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  return (
    <React.Fragment>
      {/* ToolBar */}
      <div className={classes.grow}>
      <AppBar  position="static" color='white' className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to ='/' style={{ textDecoration: 'none' , color: '#000000' }}>
          <img src={logo} className="App-logo" alt="logo" width= '100px'/>
          </Link>
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Filtering</InputLabel>
            <Select defaultValue="" id="grouped-select">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader>Sort 1</ListSubheader>
              <MenuItem value='Filter 1.1'>Filter 1.1</MenuItem>
              <MenuItem value='Filter 1.2'>Filter 1.2</MenuItem>
              <ListSubheader>Sort 2</ListSubheader>
              <MenuItem value='Filter 2.1'>Filter 2.1</MenuItem>
              <MenuItem value='Filter 2.2'>Filter 2.2</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Sorting</InputLabel>
            <Select defaultValue="" id="grouped-select">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader>Sort 1</ListSubheader>
              <MenuItem value='Sort 1.1'>Sort 1.1</MenuItem>
              <MenuItem value='Sort 1.2'>Sort 1.2</MenuItem>
              <ListSubheader>Sort 2</ListSubheader>
              <MenuItem value='Sort 2.1'>Sort 2.1</MenuItem>
              <MenuItem value='Sort 2.2'>Sort 2.2</MenuItem>
            </Select>
          </FormControl>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Link to ='/frontlogin' style={{ textDecoration: 'none' , color: '#000000' }}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >

              <Typography component="h6" variant="BUTTON TEXT" align="center" color="inherit" >
              Login
              </Typography>
              <span/>
              <AccountCircle />
              
            </IconButton>
              </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
        <Grid justify="center" alignItem="center" container spacing={1}>
            <Grid item >
              <img src={logo} className={classes.logobinus} alt="logo" />
          </Grid>
        </Grid>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {/* Side Bar */}
        <List component="nav" aria-label="main mailbox folders">
         <Link to ='/ProfileStudent' style={{ textDecoration: 'none' , color: '#000000'}}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="MyProfile" />
            </ListItem>
          </Link>

            <Link to ='/' style={{ textDecoration: 'none' , color: '#000000'}} >
              <ListItem button>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            <Link to ='/Notification' style={{ textDecoration: 'none' , color: '#000000'}}>
            <ListItem button>
              <ListItemIcon>
                <Badge badgeContent={17} color="secondary"> 
                  <NotificationsIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItem>
            </Link>

            <Link to ='/History' style={{ textDecoration: 'none' , color: '#000000'}}>
            <ListItem button>
              <ListItemIcon>
                  <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItem>
            </Link>

            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>

        <Divider />
      </Drawer>
      {renderMobileMenu}
    </div>
    </React.Fragment>
  );
}