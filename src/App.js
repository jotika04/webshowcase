import React from "react";
import ReactDOM from 'react-dom'
import Dashboard from './components/Pages/Dashboard';
import DashboardLecturer from './components/Pages/DashboardLecturer';
import ProfileStudent from './components/Pages/ProfileStudent';
import ProfileEdits from './components/Pages/ProfileEdits';
import Verification from './components/Pages/Verification';

// import logo from 'C:/Users/Ryo/webshowcase/src/image/site-logo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Frontlogin from "./components/FrontLogin";

function App() {
  return (

    <div className="classes.root">
      <Router>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/DashboardLecturer' component={DashboardLecturer}/>
          <Route exact path='/ProfileStudent'  component={ProfileStudent} />
          <Route exact path='/ProfileEdits'  component={ProfileEdits} /> 
          <Route exact path='/Verification'  component={Verification} /> 
        </Switch>
      </Router>
    </div>

  );
}

export default App;