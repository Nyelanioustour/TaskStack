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
import { getQueriesForElement } from '@testing-library/react';

const TASKURL = 'http://localhost:3000/tasks'
const USERURL = "http://localhost:3000/users";



function Calendar(props) {
    const [events, setEvents] = useState()
    const [user, setUser] = useState(props.user)
    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [start, setStart] = useState([])
    const [end, setEnd] = useState([])
    const [ID, setID] = useState([])
    const [view, setView] = useState(false)
    const [open, setOpen] = useState(false)
    
    useEffect(()=>{
      getTasks()
  },[])  

  function getTasks(){
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

        fetch(TASKURL,{
          method: "GET",
          headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Accept': 'application/json'
          }
        }).then(response => response.json().then(data => {
          setEvents(data.filter(task=>task.user_id===user.id))
        }))
      })
    }))
  }

  function handleEventClick(info){ 
    let task = events.filter(event=> event.id === parseInt(info.event.id))
    setID(info.event.id)
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
      }).then(response=>response.json()).then(getTasks())
  }
  
  return (
    <section>
      <div className="calendar-section scrolling">
        {events ?

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
          :null
        }
      </div>    


      <div>
        <NewTaskModal open={open} setOpen={setOpen} start={start} end={end} user={props.user} getTasks={getTasks}/>
        <ViewTaskModal open={view} setOpen={setView} start={start} end={end} description={description} title={title} ID={ID} user={props.user} getTasks={getTasks}/>
      </div>
        
    </section>
      );
    }
    
export default Calendar;
