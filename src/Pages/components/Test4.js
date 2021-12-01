import React, {useRef,useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
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
  import Sidebar from './sidebartest2';
  import Pagination from '@mui/material/Pagination';
  import Button from '@material-ui/core/Button'
  import Dialog from "@material-ui/core/Dialog"
  import Projectinfo from "../Projectinfo";
  import Datepicker from 'react-datepicker'
  import TextField from '@material-ui/core/TextField';
  import Stack from '@mui/material/Stack';

  // import Stack from '@material-ui/material/Stack';
  // import 'react-datepicker/dist/react-datepicker.css'

  



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

// class RenderSerach extends React.component(){

 
  class Search extends React.Component{
    
    constructor( props ){
        super( props );
    
        // this.state = {
        //     vsort: this.props.data.valuesort
        // }
      
        this.cancel = '';
  
    
    }
      
    fetchSearchResults = ( query ) => {
        // var searchUrl = 'http://localhost:3002/projectName/'+ query;
        // const vsort = this.props.data.valuesort
        const dvalue = this.props.valuesort
        // console.log(vsort);
        console.log(dvalue);
        const Page = this.props.page
        console.log(Page);
  
        var searchUrl = 'http://localhost:3003/DummyDatas?q='+ query + '&_page=' + Page;
        console.log(searchUrl);
        if( this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
    
        axios.get( `http://localhost:3003/DummyDatas?q=${query}&_page=${Page}&_limit=8 `, {
            cancelToken: this.cancel.token
        })
            .then( res =>{
              console.log(res);
                const resultNotFoundMsg = ! res.data.length
                                        ? 'Search Not Found': '';
           
                this.props.setSearchResult({
                    results: res.data,
                    message: resultNotFoundMsg,
                    loading: false,
                })
            })
            .catch(error => {
                if (axios.isCancel(error) || error){
                    this.props.setSearchResult({
                        loading:false,
                        message: 'Failed to fetch the data'
                    })
                }
            })
    };
    
    handleOnInputChange = (event) => {
        
        const query = event.target.value;
        console.log(query)
          if ( ! query ){
            this.props.setSearchResult( { query:query, results: [], loading: false, message: '' })
          } else {
            
              this.props.setSearchResult( { query:query,results:[], loading: true, message:'' } );
            
          }
          
    };
    
    handleKeyDown = (e) => {
      const Page = this.props.page
     
      if (e.key === 'Enter' ) {
        this.fetchSearchResults(e.target.value)
      }
    
      
    };
    
  render() {
    // const { query } = this.props.setSearchResult({query: event.target.value});
    // console.warn( this.state );
    
    return (
      
        <div>
       
        <InputBase
          type="text"
          name="query"
          placeholder="Search…"
          onChange={this.handleOnInputChange}
          onKeyDown={this.handleKeyDown}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    )
  }
    
    }
  
  export default function Dashboard() {
    // console.log(searchresult);
    
    // const result = searchresult.results;
    // console.log(result)
    
    // const results = Object.keys(result)
    
    
    
    const classes = useStyles();
    // const [searchTerm, setSearchTerm] = useState("");
    
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
    setId(null)
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleToggle = () => {
    setOpen(!open);
  };
  

  
  
  const [ValueSort, setValueSort] = useState("");
  const [DateValue, setDateValue] = useState("");
  const [Page, setPage] = useState(1);
  const [Id, setId] = useState(5);
  // console.log(Id);


  const handleChange2 = (event) => {
    const RenderingDate = event.target.value;
    if ( ! RenderingDate){
      setDateValue(null)
    }else{
      setDateValue('Date='+ event.target.value);
    }
  };
  const handleChange = (event) => {
    setValueSort(event.target.value);
    // console.log(event.target.value);
  };


  const handleChange3 = (event, value) => {
    
    setPage(value);
    
    
  };
  const url2 = 'http://localhost:3003/DummyDatas?';
  // const url = 'http://localhost:3003/DummyDatas?' + ValueSort + '&' +  DateValue + '&_page=' + Page + '&_limit=8';
  // console.log(url2);
  const [data, setPost] = useState([])
  const [data2, setPost2] = useState([])
  // console.log(data);
  // console.log(data2);
  // console.log(DateValue);
  // console.log(ValueSort);

  const [searchresult, setSearchResult] = useState({query: '', results:[], loading: false, message: ''});
  // console.log(searchresult);
  
  // useEffect(() => {
    //   console.log(url)
    // })
  
    useEffect(() => {
      axios.get(`http://localhost:3003/DummyDatas?${Id}&${ValueSort}&${DateValue}&_page=${Page}&_limit=8`)
        .then(res => {
          // console.log(res)
          setPost(res.data);})
        .catch(function (thrown) {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            // handle error
            console.log("error")
          }

        });
      
    
  },[ValueSort,DateValue,Page,Id])

  useEffect(() => {
    axios.get(url2).then(json => setPost2(json.data))
  }, [])



 const pagination = data2.length/8 
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Sidebar/>
      
    
      <main>
        {/* The Projects */}
        <div className={classes.heroContent} >
          
            <div className={classes.search} align="center">
                <div className={classes.searchIcon} align="center">
                </div>
                <Search setSearchResult= {setSearchResult}
                    data={searchresult}
                    valuesort = {DateValue}
                    page={Page}
                    />
              </div>
          <Container maxWidth="sm" >
            <Typography component="h1" variant="h4" align="center" color="inherit" gutterBottom>
              Recommendation
            </Typography>
          </Container>
          <Container maxWidth="lg" align="center">
          <form noValidate onChange={handleChange2} >
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={DateValue}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Sorting</InputLabel>
            <Select 
            id="grouped-select" 
            value={ValueSort} 
            onChange={handleChange}
            >
              <MenuItem value= "">
                <em>None</em>
              </MenuItem>
              <ListSubheader>course</ListSubheader>
              <MenuItem value='course=AI'>AI</MenuItem>
              <MenuItem value='course=Web Development'>Web Development</MenuItem>
              <MenuItem value='course=App Development'>App Development</MenuItem>
              <MenuItem value='course=Software Engineering'>Software Engineering</MenuItem>
              
            </Select>
          </FormControl>
          
                {searchresult.message && <p className="message"> {searchresult.message}</p>}
          </Container>
        </div>
       
        {/* Searchlive Render result */}
          
                <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4} justify="space-evenly">

{/* --------------------------------------------------------------------------------------------------------------------- */}

                {searchresult.results.map((data) => (
              <Grid item key={data.id} xs={8} sm={6} md={4} lg={3} alignContent="center">
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



      <div onClick={() => setId('id='+ data.id)} >
      <CardActionArea type="button" onClick={handleOpen}>
      <CardMedia
      className={classes.cardMedia}
      image="https://source.unsplash.com/random"
      title="Image "
      />
      </CardActionArea>
      </div>



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
        {/* Overlay */}
        <Dialog
          fullWidth={true}
          maxWidth="md"
          className={classes.backdrop}
          open={open}
          onClose={handleClose}
        >
                      
          <Grid>
            <Card className={classes.testroot}>
              <Projectinfo data={data}/>
            </Card>
          </Grid>
                      
        </Dialog> 
    </Card>
  </Grid>
            ))}
            
            
 {/* ------------------------------------------------------------------------------------------------------------------------------                */}
                {data.filter((data) => {
              if (searchresult.results == ""){
                return data
              } else {
                return null
              }
            }).map((data) => (
                  <Grid item key={data.id} xs={8} sm={6} md={4} lg={3} alignContent="center">
                  
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
                  
                  <div onClick={() => setId('id='+ data.id)} >
                  <CardActionArea type="button" onClick={handleOpen}  >
                  <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image "
                  />
                  </CardActionArea>
                  </div>

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
                  
                    
                    <Button type="button" onClick={handleOpen} >
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
                    {/* Overlay */}
                    <Dialog
                      fullWidth={true}
                      maxWidth="md"
                      className={classes.backdrop}
                      open={open}
                      onClose={handleClose}
                    >
                                  
                      <Grid>
                        <Card className={classes.testroot}>
                          <Projectinfo data={data}/>
                        </Card>
                      </Grid>
                                  
                    </Dialog>  
                    </Card>
                    </Grid>
                      
                    ))}
                    </Grid>
                    </Container>
                    <Container align="center">
                    {/* <Pagination postsPerPage = {postsperPage} totalPosts = {data.length} paginate={Paginate} /> */}
                    <Pagination count={Math.ceil(pagination)} page={Page} onChange={handleChange3} size="large" align="center"/> 
                    </Container>
                    <Copyright/>
                    </main>
      {/* <Dialog
            fullWidth={true}
            maxWidth="md"
            className={classes.backdrop}
            open={open}
            onClose={handleClose}
      >
        
          <Grid>
            <Card className={classes.testroot}>
                <Projectinfo />
            </Card>
          </Grid>
        
      </Dialog>  */}
    </React.Fragment>
  );
}