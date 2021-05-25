import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// import Header from './Header';
import MainFeaturedPost from './Projectcomp/MainFeaturedPost';
import FeaturedPost from './Projectcomp/FeaturedPost';
import Main from './Projectcomp/ProjectDescription';
import post1 from 'E:/React Projects/my-app/src/Text//blog-post.1.md';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Contact from './Projectcomp/Contactinfo';
import Contactinfo from "./Projectcomp/Contactinfo";
// import Footer from './Footer';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

// const mainFeaturedPost = {
//   title: 'Title of a longer featured blog post',
//   description:
//     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
//   image: 'https://source.unsplash.com/random',
//   imgText: 'main image description',
//   linkText: 'Continue reading…',
// };

const Contactinfos = {
    title: 'Contact',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };

const posts = [post1];

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];




export default function Projectinfo() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        
        {/* <Header title="Blog" sections={sections} /> */}
    <main>
        <Container maxWidth="lg" >
          <MainFeaturedPost >
          </MainFeaturedPost>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Description" posts={posts} />
            <Contactinfo
              title={Contactinfos.title}
              description={Contactinfos.description}
              social={Contactinfos.social}
            />
          </Grid>
        </Container>
    </main>
      {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
    </React.Fragment>
  );
}