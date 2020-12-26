import './App.css';
import React, { useEffect } from 'react'
import Routes from './Routes';
import { Link  } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import { AppContext } from './libs/contextLib';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PublicIcon from '@material-ui/icons/Public';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import clsx from 'clsx';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  // },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



function App() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const [isAuthenticated, userHasAuthenticated] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme()
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    onLoad();
  }, [])


  async function onLoad(){
      try{
        await Auth.currentSession();
        userHasAuthenticated(true);

      } catch(e) {
        if(e !== 'No current user'){
          alert(e);
        }
      }
      setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('/login');
  }

  function handleDrawerOpen(){
    setOpen(true);
  }

  function handleDrawerClose(){
    setOpen(false);
  }

    const itemsList = [
      {
        text: 'Home',
        icon: <DirectionsCarIcon/>,
        onClick: () => history.push('/')
      },
      {
        text: 'About',
        icon: <InfoIcon/>,
        onClick: () => history.push('/about')
      },
      {
        text: 'European Countries',
        icon: <PublicIcon/>,
        onClick: () => history.push('/apitest')
      },
    ];



  return (
    !isAuthenticating && (
    <div className={classes.root}>
     
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <ToolBar>
          {isAuthenticated ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Button component={Link} to='/' color='inherit'>Home</Button>
              <Button component={Link} to='/about' color='inherit'>About</Button>
              <Grid container justify="flex-end">
                <Button component={Link} to='/logout' color='inherit' onClick={handleLogout} >Logout</Button>
              </Grid>

            </>
          ) : (
            <>
              <Button component={Link} to='/' color='inherit'>Home</Button>
              <Button component={Link} to='/about' color='inherit'>About</Button>
              <Grid container justify="flex-end">
                <Button component={Link} to='/login' color='inherit' >Login</Button>
                <Button component={Link} to='/signup' color='inherit'>Sign Up</Button>
              </Grid>
            </>
          )}
        </ToolBar>
      </AppBar>

      <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                  <Divider/>
                  <List>
                    {itemsList.map((item, index) => {
                      const { text, icon,  onClick} = item;
                      return(
                        <ListItem button key={text} onClick={onClick}>
                          {icon && <ListItemIcon>{icon}</ListItemIcon>}
                          <ListItemText primary={text}/>
                        </ListItem>
                      );
                    })}
                  </List>
              </Drawer>

      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes/>
      </AppContext.Provider>

    </div>
  ));
}

export default App;



