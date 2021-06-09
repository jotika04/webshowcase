import React from "react";
import Dashboard from './Pages/Dashboard';
import DashboardLecturer from './Pages/DashboardLecturer';
import ProfileStudent from './Pages/ProfileStudent';
import ProfileEdits from './Pages/ProfileEdits';
import Verification from './Pages/Verification';
import Sidebar from './Pages/components/Sidebar';
import History from './Pages/History';
import Notification from './Pages/Notification';
import FrontLogin from './Pages/FrontLogin';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ConfirmPage from "./Pages/ConfirmPage";
import SubmissionPage from "./Pages/Submission";
import { SubmitProcess } from "./Pages/SubmitProcess";
import Test from "./Pages/components/Test";
import Test2 from "./Pages/components/Test2";
import Projectdetails from './Pages/Projectdetails';
import Projectinfo from './Pages/Projectinfo';
import ToDo from './Pages/ToDo';

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
          <Route exact path='/frontlogin'  component={FrontLogin} />
          <Route exact path='/loginpage'  component={LoginPage} />
          <Route exact path='/registerpage'  component={RegisterPage} />
          <Route exact path='/submission' component={SubmissionPage} />
          <Route exact path='/confirmsubmission' component={ConfirmPage}/>
          <Route exact path='/submit' component={SubmitProcess}/>
          <Route exact path='/DashboardLecturer' component={DashboardLecturer}/>
          <Route exact path='/ProfileStudent'  component={ProfileStudent} />
          <Route exact path='/ProfileEdits'  component={ProfileEdits} /> 
          <Route exact path='/Verification'  component={Verification} /> 
          <Route exact path='/Sidebar'  component={Sidebar} /> 
          <Route exact path='/History'  component={History} /> 
          <Route exact path='/Notification'  component={Notification} />
          <Route exact path='/Test' component={Test}/>
          <Route exact path='/Test2' component={Test2}/>
          <Route exact path='/Projectdetails' component={Projectdetails}/>
          <Route exact path='/Projectinfo' component={Projectinfo}/>
          <Route exact path='/testing' component={ToDo}/>
        </Switch>
      </Router>
    </div>

  );
}

export default App;