import React, {useState, useEffect} from 'react'
import axios from 'axios'
import clsx from 'clsx';
import { CardContent, CardMedia, CssBaseline, Grid,  Typography, Container, Card, 
   CardHeader, Avatar, IconButton,  Badge, Menu, MenuItem, CardActionArea,  
  InputLabel, FormControl, Select, ListSubheader, InputBase} 
  from '@material-ui/core';
  import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
  import { lightBlue } from '@material-ui/core/colors';
  import FavoriteIcon from '@material-ui/icons/Favorite';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import AccountCircle from '@material-ui/icons/AccountCircle';
  import MailIcon from '@material-ui/icons/Mail';
  import NotificationsIcon from '@material-ui/icons/Notifications';
  import CommentIcon from '@material-ui/icons/Comment';
  import Sidebar, {searchTerm, setSearchTerm} from './Sidebar';
  import Pagination from './Pagination';
  import Button from '@material-ui/core/Button'
  import Dialog from "@material-ui/core/Dialog"
  import Projectinfo from "../Projectinfo";
  import Chip from '@material-ui/core/Chip';
  import TextField from '@material-ui/core/TextField';
  import Datepicker from 'react-datepicker'
  import 'react-datepicker/dist/react-datepicker.css'
  import SearchIcon from '@material-ui/icons/Search';

  // import Autocomplete from '@material-ui/lab/Autocomplete';
  
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
    justify:"center",
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
  const [searchTerm, setSearchTerm] = useState("");

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
  
  const [postMessage, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsperPage, setPostsPerPage] = useState(8);

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

  const indexOfLastPost = currentPage * postsperPage;
  const indexOfFirstPost = indexOfLastPost - postsperPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)

  const Paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [selectedDate, setSelectedDate] = useState(null);
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Sidebar/>
      <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              type="text"
              placeholder="Search…"
              onChange={(event) => {setSearchTerm(event.target.value);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}

            />
          </div>
    
      <main>
        {/* The Projects */}
        <div className={classes.heroContent} >
          <Container maxWidth="sm" >
            <Typography component="h1" variant="h4" align="center" color="inherit" gutterBottom>
              Recommendation
            </Typography>
          </Container>
          <Container maxWidth="lg" align="center">
          <Datepicker 
            selected={selectedDate} 
            onChange={date => setSelectedDate(date)} 
            maxDate = {new Date()}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
            className={classes.formControl}
            />
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
          
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4} justify="space-evenly">
            {currentPosts.filter((data) => {
              if (searchTerm == ""){
                return data
              } else if (data.Project_name.toLowerCase().includes(searchTerm.toLowerCase())){
                return data
              }
            }).map((data) => (
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



      <CardActionArea type="button" onClick={handleOpen}>
      
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image "
        />
        </CardActionArea>
     



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
        <Container>
        <Pagination postsPerPage = {postsperPage} totalPosts = {data.length} paginate={Paginate} />
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