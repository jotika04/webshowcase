---
title : Login and Register
sidebar_position: 2
---

import frontloginimg from './images/Frontlogin.jpg';
import loginimg from './images/Login.jpg';
import registerimg from './images/Register.jpg';

# Login and Register
## Introduction

For the components on this part we imported a library called material ui.

Material ui is a framework for react and it is used to make the components of react better than the default given by react.

To install this framework, open the command prompt or terminal depending on the machine used.
Then type the code below on the cmd or terminal :

```
npm install @material-ui/core
```

### Option to login or register
First the user would meet a page in which they would have to choose between two buttons.
Then each button would have a different name one would be login and the other is register.

<img src={frontloginimg} alt="Front login Page Pic"/>

For the Login button code :
```
    <Link to="/loginpage" style={{ textDecoration: 'none' }} className="nav-links">
                <Button variant="contained" color="primary" className="button-login">
                  Login
                </Button> 
```

For the register button code :

```
 <Link to="/registerpage" style={{ textDecoration: 'none' }} >
                <Button variant="contained" color="primary" className="button-register">
                  Register
                </Button>
```

### Login page
In the login page there would be two input fields and each needs a username/email of the user and the password for that account.
The user will also encounter a highlighted writting that says register if user do not have an account. If the user clicks on the highlighted word they would go to the register page.

<img src={loginimg} alt="Login Page Pic"/>

The code below shows how to create a text field for the username.


```
<TextField id="username" variant="outlined" className="text-field-user" label='Name' placeholder='Name' />
```
And to create the place holder for the password, just add a type password so that the react knows that it is a password and needs to be hidden.


### Register Page
In the register page the user would encounter four types of input field. The input fields stands for a username, password, email, and a confirm password for the user.

All of the input field would function the same way except the confirm password where it would compare the variable in it to the password, 
like the name suggests it would confirm the password is correct.

In the register page also like the login page but the difference is the highlighted word is Login if you have an account and it would take the user to the login page.

<img src={registerimg} alt="Register Page Pic"/>

The snippet below shows how the textfield code :

```
<Grid item xs={12}>
  <TextField id="username" variant="outlined" className="name-text" label='Name' placeholder='Name' fullWidth/>
  </Grid>
```

The second snippet shows how the button is coded :

```
  <Button type='submit' variant="contained" color="primary" className={classes.submit} fullWidth>
  Register
  </Button>
```
