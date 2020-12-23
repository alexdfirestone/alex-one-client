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


function App() {
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const [isAuthenticated, userHasAuthenticated] = React.useState(false);
  const history = useHistory();


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


  return (
    !isAuthenticating && (
    <div className="App">


      <AppBar position="sticky">
        <ToolBar>
          {isAuthenticated ? (
            <Button component={Link} to='/logout' color='inherit' onClick={handleLogout}>Logout</Button>

          ) : (
            <>
              <Button component={Link} to='/login' color='inherit'>Login</Button>
              <Button component={Link} to='/signup' color='inherit'>Sign Up</Button>
            </>
          )}
          <Button component={Link} to='/' color='inherit'>Home</Button>
          <Button component={Link} to='/about' color='inherit'>About</Button>

        </ToolBar>
      </AppBar>

      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes/>
      </AppContext.Provider>

    </div>
  ));
}

export default App;
