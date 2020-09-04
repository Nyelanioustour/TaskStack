import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Search,
  Divider,
  Grid,
  Segment,
} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import About from './About.js'
import Home from './Home.js'
import User from './User.js'

function Navbar() {
  const [user, setUser] = useState("")
  const history = useHistory()

  function logout(){
    localStorage.clear();
    setUser("")
  }
  
  return (
    <Router >
      <div >
        <nav className="Navbar">
          <div>
            <img className="app-logo" src="applogo.png" height='50px'/>
          </div>
          <div className="app-title">
            <h1>
              TaskStack
            </h1>
          </div>
            <div className="nav-buttons">
              <a>
                <Link to="/"><Button color="green">Home</Button></Link>
              </a>
              <a>
                <Link to="/user"><Button color="green">UserView</Button></Link>
              </a>
              { localStorage.token ?
                <a className="logout-button">
                <Button color="green" onClick={logout}>Logout</Button>
                </a>
                :null
              }
                <a className="about-button">
                <Link to="/about"><Button color="green">About</Button></Link>
                </a>
            </div>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/user">
            <User user={user}/>
          </Route>
          <Route path="/">
            <Home setUser={setUser}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default Navbar;
