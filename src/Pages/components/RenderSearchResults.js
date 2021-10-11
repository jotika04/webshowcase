import React from 'react'
import { CardContent, CardMedia,  Grid,  Typography, Container, Card, 
   CardHeader, Avatar, IconButton,   CardActionArea} 
  from '@material-ui/core';
  import FavoriteIcon from '@material-ui/icons/Favorite';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import AccountCircle from '@material-ui/icons/AccountCircle';
  import CommentIcon from '@material-ui/icons/Comment';
  import Button from '@material-ui/core/Button'
  import 'react-datepicker/dist/react-datepicker.css'



  class RenderSearchresults extends React.Component{

  

   render(){

       const { result } = this.props.data.results;
       
       if ( Object.keys( result ).length && result.length){
           return (
               <Container  maxWidth="lg">
        <Grid container spacing={4} justify="space-evenly">
          {result.map(data => (
              <Grid item key={data.project_name} xs={8} sm={6} md={4} lg={3} alignContent="center">

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
      title={data.project_name}
      />

    <CardActionArea type="button" >
    
    <CardMedia
      
      image="https://source.unsplash.com/random"
      title="Image "
      />
      </CardActionArea>

    <CardContent  >
      <Typography variant="body2" color="textSecondary" component="p">
      <p>{data.description.length > 75 ?
            `${data.description.substring(0,75)}...` : data.description}</p>
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
      );
    }
    
    }   
}
export default RenderSearchresults