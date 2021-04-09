import React from "react";

import FrontLogin from './components/FrontLogin';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage'

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConfirmPage from "./components/pages/ConfirmPage"
import SubmissionPage from "./components/pages/Submission";
import { SubmitProcess } from "./components/pages/SubmitProcess";


function App() {
  return (
    
    <div className="classes.root">
      <Router>
        <Switch>
          <Route exact path='/' component={FrontLogin}/>
          <Route exact path='/frontlogin'  component={FrontLogin} />
          <Route exact path='/loginpage'  component={LoginPage} />
          <Route exact path='/registerpage'  component={RegisterPage} />
          <Route exact path='/submission' component={SubmissionPage} />
          <Route exact path='/confirmsubmission' component={ConfirmPage}/>
          <Route exact path='/submit' component={SubmitProcess}/>
        </Switch>
      </Router>
    </div>

  );
}

export default App; 
