---
id : Dashboard
title : Dashboard Doc
---

The dashboard is a page where it serves as a main menu for the application.

There would be two types of dashboard one wouuld for the guest and the submitter and the other one is for the validator.


# Submitter Dashboard 

## Toolbar/Appbar

For the tool bar there would be a few functions that are shown sucha as a logo, search bar, filter bar, sort bar, notification bell, and a profile button.

### Logo

To put the logo is simple we would just need to import the logo picture file and rename it. 

After importing the logo we just need to put it just like in the snippet below.
```
<Link to ='/' style={{ textDecoration: 'none' , color: '#000000' }}>
          <img src={logo} className="App-logo" alt="logo" width= '100px'/>
          </Link>
```

### Search bar

For the search bar just create an input base. It would look like the snippet below.
```
<InputBase
        placeholder="Writting on the searchbar"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
/>
```

### Filter and Sort bar

Create a form control and create the value for the filter and sort.
The snippet below would showsome of the code.
```
<FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Filtering</InputLabel>
            <Select defaultValue="" id="grouped-select">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader>Filter 1</ListSubheader>
              <MenuItem value='Filter 1.1'>Filter 1.1</MenuItem>
              <MenuItem value='Filter 1.2'>Filter 1.2</MenuItem>
            </Select>
          </FormControl>
```

### Notification logo

The notification logo just need to use a simple icon button.
```
<IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
```

### Drop down menu

For the drop downn menu, we need to create a drawer function.
```
<Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
```
The snippet above shows the code for drawer.

Then after creating the drawer put the items now create the list of items to put into the drawer.
```
<Link to ='/ProfileStudent' style={{ textDecoration: 'none' , color: '#000000'}}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="MyProfile" />
            </ListItem>
          </Link>
```
The snippet above shows one of the type of items that can be put in the drawer.

## Shown project

For the projects just show the projects as recommended.

# Validator Dashboard

For the validator dashboard we just need to recreate the submitter but add another function to the drop box for validation.

