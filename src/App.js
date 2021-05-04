import React from "react";
import Dashboard from './Pages/Dashboard';
import DashboardLecturer from './Pages/DashboardLecturer';
import ProfileStudent from './Pages/ProfileStudent';
import ProfileEdits from './Pages/ProfileEdits';
import Verification from './Pages/Verification';
import Sidebar from './Pages/components/Sidebar';
import History from './Pages/History';
import Notification from './Pages/Notification';


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
          <Route exact path='/Sidebar'  component={Sidebar} /> 
          <Route exact path='/History'  component={History} /> 
          <Route exact path='/Notification'  component={Notification} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;