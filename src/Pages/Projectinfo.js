import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProjectDesc from './Projectcomp/ProjectDescription';
import post1 from 'E:/React Projects/my-app/src/Text/blog-post.1.md';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Contactinfo from "./Projectcomp/Contactinfo";
import Slider from "./Projectcomp/Slider";
import MusicCard from "./Projectcomp/MusicCard";
import {db} from "./Projectcomp/db";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


// import Footer from './Footer';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
}));


const Contactinfos = {
    title: 'Info',
    description:
      'Info from the creator.',
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };


// const [data, setData] = useState([])

//   useEffect(() => {
//     axios.get(url).then(json => setData(json.data))
//   }, [])





export default function Projectinfo({data}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
    <main>
        <Container maxWidth="lg" >
          <Typography variant="h4" gutterBottom>
            {data.Project_name}
          </Typography>
          <Divider />
          <Slider/>
          <Grid container spacing={6} className={classes.mainGrid} >
            <ProjectDesc Data={data}/>
            <Contactinfo
              title={Contactinfos.title}
              description={Contactinfos.description}
              social={Contactinfos.social}
            />

            
            <MusicCard
            align="center"
            data={db.alternative[1]}
            />
          </Grid>
        </Container>
    </main>
      {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
    </React.Fragment>
  );
}