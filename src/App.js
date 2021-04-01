import React from "react";
import ReactDOM from 'react-dom'
import FrontLogin from './components/FrontLogin';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage'
import logo from 'C:/Users/Ryo/webshowcase/src/image/site-logo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frontlogin from "./components/FrontLogin";

function App() {
  return (
    
    <div className="classes.root">
      <Router>
        <Switch>
          <Route exact path='/' component={FrontLogin}/>
          <Route exact path='/frontlogin'  component={FrontLogin} />
          <Route exact path='/loginpage'  component={LoginPage} />
          <Route exact path='/registerpage'  component={RegisterPage} />
        </Switch>
      </Router>
    </div>

  );
}

export default App; 
