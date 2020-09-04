import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Search,
  Divider,
  Grid,
  Segment,
} from 'semantic-ui-react'
import '../App.css';
import 'semantic-ui-css/semantic.min.css'
import SignUpModal from './SignUpModal.js'
import LogInModal from './LogInModal.js'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory } from 'react-router-dom';
import NewTaskModal from './NewTaskModal';
import ViewTaskModal from './ViewTaskModal';
import TaskStack from './TaskStack';

const TASKURL = 'http://localhost:3000/tasks'

function Home(props) {
    const [events, setEvents] = useState([])
    const [showCalendar, setShowCalendar] = useState(false)
    const [showTask, setShowTask] = useState(false)
    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [start, setStart] = useState([])
    const [end, setEnd] = useState([])
    const [view, setView] = useState(false)
    const [open, setOpen] = useState(false)


  function getTasks(){
    fetch(TASKURL,{
      method: "GET",
      headers: {
      Authorization: `Bearer ${localStorage.token}`,
      'Accept': 'application/json'
      }
    }).then(response => response.json().then(data => {
            setEvents(data)
    }))
  }
  
  function switchCalendar(){
    setShowCalendar(!showCalendar)
    setShowTask(false)
    getTasks()
  }
  function switchTaskView(){
    setShowTask(!showTask)
    setShowCalendar(false)
    getTasks()
  }

  function handleEventClick(info){ 
    let task = events.filter(event=> event.id === parseInt(info.event.id))
    setTitle(task[0].title)
    setDescription(task[0].description)
    setStart(`${task[0].start}`)
    setEnd(`${task[0].end}`)
    setView(true)
}

  function handleDateClick(info){ 
    let date = info.dateStr
    setDate(date)
  }

  function setDate(date){
    setStart(date)
    setEnd(date)
    setOpen(true)
  }

  function handleEventMove(info){ 
      let task = {id:info.event.id,start:info.event.startStr,end:info.event.endStr}
      let URL = TASKURL+'/'+task.id

    fetch(URL,{
        method:'PATCH',
        headers:{
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ task })
      }).then(response=>response.json()).then(console.log)
  }
  
  return (
    <section>
      {localStorage.token ? 
      <>

      <div className="home-nav-buttons">
      <Button color="green" onClick={switchCalendar}>Calendar View</Button>
      <Button color="green" onClick={switchTaskView}>TaskView</Button>
      <Button color="green">Journal View</Button>
      </div>

      <div className="calendar-section">
        {showCalendar 
          ? 
          <FullCalendar
          plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={ {
            right: 'today prev,next',
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          editable={true}
          eventStartEditable={true}
          selectable={true}
          nowIndicator={true}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          eventDrop={handleEventMove}
          eventResize={handleEventMove}
          events={events}
          />
          :null}
      </div>    

      <div>
        {showTask ?
          <TaskStack/>
          :null
        }
      </div>

      <div>
        <NewTaskModal open={open} setOpen={setOpen} start={start} end={end} getTasks={getTasks}/>
        <ViewTaskModal open={view} setOpen={setView} start={start} end={end} description={description} title={title}/>
      </div>
      </>
      : <div className="login-section">
          <Segment placeholder>
            <Grid columns={2} textAlign="center">
              <Divider vertical>Or</Divider>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                <Header>
                <h1>Login</h1>
                </Header>
                <LogInModal setUser={props.setUser} switchCalendar={switchCalendar}/>
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
        </div>
      }


    </section>
      );
    }
    
export default Home;
