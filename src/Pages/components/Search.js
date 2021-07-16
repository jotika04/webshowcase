import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import { CardContent, CardMedia, CssBaseline, Grid,  Typography, Container, Card, 
    CardHeader, Avatar, IconButton,  Badge, Menu, MenuItem, CardActionArea,  
   InputLabel, FormControl, Select, Button, InputBase} 
   from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';



class Search extends React.Component{
    
constructor( props ){
    super( props );

    this.state = {
        query: '',
        results: {},
        loading: false,
        message: ''
    }

    this.cancel = '';

}


  
fetchSearchResults = ( query ) => {
    const searchUrl = 'http://localhost:3000/DummyDatas';

    if( this.cancel){
        this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios.get( searchUrl, {
        cancelToken: this.cancel.token
    })
        .then( res =>{
            const resultNotFoundMsg = ! res.data.length
                                    ? 'Search Not Found': '';
            this.setState({
                results: res.data,
                message: resultNotFoundMsg,
                loading: false
            })
        })
        .catch(error => {
            if (axios.isCancel(error) || error){
                this.setState({
                    loading:false,
                    message: 'Failed to fetch the data'
                })
            }
        })
};

handleOnInputChange = (event) => {
    
    const query = event.target.value;
    if ( ! query ){
        this.setState( { query, results: {}, message: '' })
    } else {
        this.setState( { query, loading: true, message:''} );
    this.fetchSearchResults( query );
    }
    
};

renderSearchResults = () => {
    const { results } = this.state;

    if ( Object.keys( results ).length && results.length){
        return (
            <Container  maxWidth="lg">
          <Grid container spacing={4} justify="space-evenly">
            {results.map(data => (
              <Grid item key={data.Project_name} xs={8} sm={6} md={4} lg={3} alignContent="center">

                <Card >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" >
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



      <CardActionArea type="button" >
      
      <CardMedia
        image="https://source.unsplash.com/random"
        title="Image "
        />
        </CardActionArea>
     



      <CardContent  >
        <Typography variant="body2" color="textSecondary" component="p">
        <p>{data.Description.length > 75 ?
              `${data.Description.substring(0,75)}...` : data.Description}</p>
        </Typography>
      </CardContent>

      {/* <CardActions disableSpacing> */}
          
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
         
        <Button type="button"  >
            <IconButton
            
            >
                <CommentIcon /> 
            </IconButton>
        </Button>
    </Card>
  </Grid>
            ))}
          </Grid>
        </Container>
        )
    }
};

    render() {
        const { query, message, loading } = this.state;
        console.warn( this.state );
        return (
            <div >
            
            <SearchIcon />
            
            <InputBase
              type="text"
              name="query"
              value={ query }
              placeholder="Search…"
              onChange={this.handleOnInputChange}
              inputProps={{ 'aria-label': 'search' }}

            />
            {message && <p className="message"> {message}</p>}
            
            {this.renderSearchResults()}
            
          </div>
        )
    }

}

export default Search