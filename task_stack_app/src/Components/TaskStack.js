import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';

function TaskStack() {
    const [events, setEvents] = useState([])
    const [stacks, setStacks] = useState([])
    const [count, setCount] = useState(0)
    const TASKURL = 'http://localhost:3000/tasks'
    const STACKURL = 'http://localhost:3000/stacks'

    useEffect(()=>{
        getTasks()
        getStack()
    },[])

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
    function getStack(){
        fetch(STACKURL,{
          method: "GET",
          headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Accept': 'application/json'
          }
        }).then(response => response.json().then(data => {
                setStacks(data)
                console.log(stacks)
        }))
    }


    function increaseCount(){
        if (count === stacks.length -1){
            setCount(0)
        }
        else setCount(count+1)
    }
    function decreaseCount(){
        if (count===0){
            setCount(stacks.length-1)
        }
        else setCount(count-1)

    }


    return (
      <div>
          <div className="list-view">
          <FullCalendar
              plugins={[ listPlugin, interactionPlugin ]}
              initialView="listWeek"
              editable={true}
              eventStartEditable={true}
              selectable={true}
              // eventClick={handleEventClick}
              // dateClick={handleDateClick}
              // eventDrop={handleEventMove}
              // eventResize={handleEventMove}
              events={events}
              />
          </div>
          <div className="task-stack">
            <Card color="green">
                {stacks.length>0 ?
                <div>
                <Card.Content>
                <Card.Header>{stacks[count].title}</Card.Header>
                    <hr></hr>
                    <p>{stacks[count].description}</p>
                </Card.Content>
                <Card.Content extra>
                    <hr></hr>
                    <p>
                    Category: {stacks[count].category} Length: {stacks[count].length} minutes
                    </p>
                </Card.Content>
                <br></br>
                <button onClick={decreaseCount}>Back</button><button onClick={increaseCount}>Next</button>
                </div>
                :<button>New Task</button>
                }
            </Card>
          </div>
      </div>
    );
  }
  
  
  export default TaskStack;