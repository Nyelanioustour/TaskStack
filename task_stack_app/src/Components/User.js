import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Header,
    Icon,
    Search,
    Divider,
    Grid,
    Segment,
    Statistic
  } from 'semantic-ui-react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function User(props) {
  const [user, setUser] = useState("")
  const [tasks, setTasks] = useState()
  const [stacks, setStacks] = useState()
  const [taskcount, setTaskCount] = useState(0)
  const [stackcount, setStackCount] = useState(0)
 let joinedDate = `${props.user.created_at}`.substring(0,10)

 const USERTASKURL = `http://localhost:3000/user_tasks`
 const USERSTACKURL = `http://localhost:3000/user_stacks`
 const USERURL = `http://localhost:3000/users`
 const percentage = Math.round((props.user.minutes/(8*60* Math.ceil((Date.now() - Date.parse(joinedDate))/(1000*60*60*24))))*100)
 useEffect(()=>{
    getUser()
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
    })
  }))
}

    return (
      <section>
      {user!== "" ? 
      <section>

      <div className="user-section">
          <Card className="user-info">
          <Card.Content>
          <Card.Header>{user.username}</Card.Header>
          <Card.Meta>
          <span className='date'>Joined {joinedDate}</span>
          </Card.Meta>
          <Card.Description>
          <Statistic color="green">
            <Statistic.Value>{user.calevents}</Statistic.Value>
            <Statistic.Label>completed scheduled tasks</Statistic.Label>
          </Statistic>
          <Statistic color="green">
            <Statistic.Value>{user.stackevents}</Statistic.Value>
            <Statistic.Label>completed unscheduled tasks</Statistic.Label>
          </Statistic>
          <br></br>
          <Statistic className="user-minutes" color="green">
            <Statistic.Value>{user.minutes}</Statistic.Value>
            <Statistic.Label> minutes of time optimized</Statistic.Label>
          </Statistic>
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <a>
          <Icon name='calendar' />
          {Math.ceil((Date.now() - Date.parse(joinedDate))/(1000*60*60*24))} day(s) using TaskStack!
          </a>
          </Card.Content>
          </Card>
          <Card className="efficiency">
          <Card.Content>
          <Card.Header>Efficiency</Card.Header>
          <Card.Description>
          <CircularProgressbar value={percentage} text={`${percentage}%`} styles={{text:{fill:`green`},path:{stroke:'green'}}}/>
          </Card.Description>
          </Card.Content>
          </Card>
      </div>
          <div>
          <video className="app-video" loop autoPlay>
              <source src="./Video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          </div>
      </section>
      :null}
      </section>
        );
      }
  
  
  export default User;