import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Divider,
  Grid,
  Segment,
  Image
} from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import About from './About.js'
import Home from './Home.js'
import User from './User.js'
import Calendar from './Calendar.js'
import LogInModal from './LogInModal.js';
import SignUpModal from './SignUpModal.js';
import TaskStack from './TaskStack.js';

function Navbar() {
  const [user, setUser] = useState("")
  const [events, setEvents] = useState([])

  const USERURL = "http://localhost:3000/users";
  const TASKURL = 'http://localhost:3000/tasks'


  function logout(){
    localStorage.clear();
    window.location.reload()
  }

  useEffect(()=>{
    if(localStorage.token){
      getUser()
    }
  },[])

  function getUser(){
    fetch(USERURL,{
      method: "GET",
      headers: {
      Authorization: `Bearer ${localStorage.token}`,
      'Accept': 'application/json'
      }
    }).then(response => response.json().then(data => {
      data.forEach(user => {
        if(user.username === localStorage.username){
          setUser(user)
        }
        console.log(data)
      })
    }))
  }

  return (
    <Router >
      <div >
        <nav className="Navbar">
          <div>
            <img className="app-logo" src="applogo.png" height='50px'/>
          </div>
          <div className="app-title">
              <Link to="/"><h1>TaskStack</h1></Link>
          </div>
          <div className="nav-buttons">
            { localStorage.token ?
            <>
              <a>
                <Link to="/user"><Button color="green">UserView</Button></Link>
              </a>
              <a>
                <Link to="/calendar"><Button color="green">CalendarView</Button></Link>
              </a>
              <a>
                <Link to="/tasks"><Button color="green">TaskView</Button></Link>
              </a>
              <a className="logout-button">
              <Link to="/"><Button color="green" onClick={logout}>Logout</Button></Link>
              </a>
            </>
              :null
            }
              <a className="about-button">
              <Link to="/about"><Button color="green">Guide</Button></Link>
              </a>
          </div>
        </nav>
        <Switch>

          <Route path="/login">
          {localStorage.token ? <Redirect to="/user" /> 
          :<div className="login-section">
                <Segment placeholder>
                  <Grid columns={2} textAlign="center">
                    <Divider vertical>Or</Divider>
                    <Grid.Row verticalAlign='middle'>
                      <Grid.Column>
                      <Header>
                      <h1>Login</h1>
                      </Header>
                      <LogInModal user={user}/>
                      </Grid.Column>
                      <Grid.Column>
                      <Header>
                      <h1>Create New Account</h1>
                      </Header>
                      <SignUpModal/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                <div className="home">
                 <Image src='./Main.png' centered />
               </div>
             </div>
          }
          </Route>
        
          <Route path="/about">
            <About />
          </Route>

          <Route path="/user">
            {!localStorage.token ? <Redirect to="/login" /> : <User user={user} getUser={getUser}/>}
          </Route>

          <Route path="/calendar">
            {!localStorage.token ? <Redirect to="/login" /> : <Calendar user={user}/>}
          </Route>

          <Route path="/tasks">
            {!localStorage.token ? <Redirect to="/login" /> : <TaskStack user={user}/>}
          </Route>

          <Route path="/home">
            {!localStorage.token ? <Redirect to="/login" /> : <Home/>}
          </Route>

          <Route path="/">
            {!localStorage.token ? <Redirect to="/login" /> : <Redirect to="/home"/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Navbar;
