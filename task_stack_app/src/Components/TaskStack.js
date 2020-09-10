import React, { useState, useEffect } from 'react';
import { Card, Container, Divider, Button, Icon, Form, Segment, Grid, GridColumn } from 'semantic-ui-react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import NewStackModal from './NewStackModal.js'


function TaskStack(props) {
    const [events, setEvents] = useState([])
    const [stacks, setStacks] = useState([])
    const [displayStacks, setDisplayStacks] = useState([])
    const [sortTime, setSortTime] = useState("NoTime")
    const [sortType, setSortType] = useState("NoType")
    const [user, setUser] = useState(props.user)
    const [count, setCount] = useState(0)
    const [open, setOpen] = useState(false)
    const TASKURL = 'http://localhost:3000/tasks'
    const STACKURL = 'http://localhost:3000/stacks'
    const USERURL = "http://localhost:3000/users";
    const USERSTACKURL = `http://localhost:3000/user_stacks`


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
              console.log(user)
            }
    
            fetch(TASKURL,{
              method: "GET",
              headers: {
              Authorization: `Bearer ${localStorage.token}`,
              'Accept': 'application/json'
              }
            }).then(response => response.json().then(data => {
              setEvents(data.filter(task=>task.user_id===user.id))
              getStacks()
            }))
          })
        }))
      }

    function getStacks(){
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
          fetch(STACKURL,{
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Accept': 'application/json'
            }
          }).then(response => response.json().then(data => {
              setStacks(data.filter(stack=>stack.user_id===user.id))
              setDisplayStacks(data.filter(stack=>stack.user_id===user.id))
              console.log(stacks)
              console.log(displayStacks)
          }))
        })
      }))
      }

      

    function completeStack(){
      let URL = USERURL +"/"+props.user.id
      let stackevents = user.stackevents + 1
        fetch(URL,{
            method:'PATCH',
            headers:{
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ user:{stackevents:stackevents} })
        }).then(response=>response.json()).then((data)=>{
          let URL = STACKURL+"/"+stacks[count].id
          console.log(data)
          fetch(URL,{
            method:'DELETE',
              headers:{
                  Authorization: `Bearer ${localStorage.token}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          })
          window.location.reload()
        }
          )
    }

    function increaseCount(){
        if (count === displayStacks.length -1){
            setCount(0)
        }
        else setCount(count+1)
    }
    
    function decreaseCount(){
        if (count===0){
            setCount(displayStacks.length-1)
        }
        else setCount(count-1)

    }
    
    function handleTypeChange(e,{value}){
      setSortType(value)
      if(sortTime !== "NoTime"){
        if(value !== "NoType"){
          setDisplayStacks(stacks.filter(stack=> stack.category === value && stack.length < parseInt(sortTime)+1))
          setCount(0)
        }
        else setDisplayStacks(stacks.filter(stack=>stack.category === sortTime))
      }
      else {
        if(value !== "NoType"){
          setDisplayStacks(stacks.filter(stack=> stack.category === value))
          setCount(0)
        }
        if(value === "NoType") 
        setDisplayStacks(stacks)
        setCount(0)
      }
      
    }
    
    function handleTimeChange(e,{value}){
      setSortTime(value)
      if(sortType !== "NoType"){
        if(value !== "NoTime"){
          setDisplayStacks(stacks.filter(stack=> stack.category === sortType).filter(stack=> stack.length < parseInt(value)+1))
          setCount(0)
        }
        else setDisplayStacks(stacks.filter(stack=>stack.category === sortType))
      }
        else{

          if(value !== "NoTime"){
            setDisplayStacks(stacks.filter(stack=> stack.length < parseInt(value)+1))
            setCount(0)
          }
          if(value === "NoTime") {
            setDisplayStacks(stacks)
            setCount(0)
          }
        }
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
              events={events}
              />
          </div>
          <div className="sort-options">
            <Segment>
              <Grid columns={2}>
                <GridColumn>   
                  <Form.Group>
                  <label>Sort by Type</label>
                  <Form.Radio
                    label='None'
                    value='NoType'
                    checked={sortType === 'NoType'}
                    onChange={handleTypeChange}
                    />
                  <Form.Radio
                    label='Chores'
                    value='Chore'
                    checked={sortType === 'Chore'}
                    onChange={handleTypeChange}
                    />
                  <Form.Radio
                    label='Work'
                    value='Work'
                    checked={sortType === 'Work'}
                    onChange={handleTypeChange}
                    />
                  <Form.Radio
                    label='School'
                    value='School'
                    checked={sortType === 'School'}
                    onChange={handleTypeChange}
                    />
                  </Form.Group>
                </GridColumn>
                <GridColumn>
                  <Form.Group>
                    <label>Sort by Time</label>
                    <Form.Radio
                      label='None'
                      value='NoTime'
                      checked={sortTime === 'NoTime'}
                      onChange={handleTimeChange}
                      />
                    <Form.Radio
                      label='10 minutes'
                      value='10'
                      checked={sortTime === '10'}
                      onChange={handleTimeChange}
                      />
                    <Form.Radio
                      label='30 Minutes'
                      value='30'
                      checked={sortTime === '30'}
                      onChange={handleTimeChange}
                      />
                    <Form.Radio
                      label='60 Minutes'
                      value='60'
                      checked={sortTime === '60'}
                      onChange={handleTimeChange}
                      />
                  </Form.Group>
                </GridColumn>
                </Grid>
            </Segment>



            <Button.Group >
                <Button onClick={decreaseCount} color="green" icon>
                    <Icon name="left arrow"/>
                </Button>
                <Button onClick={()=>setOpen(true)} color="green">New Task</Button>
                <Button onClick={()=>{
                  completeStack()
                }} color="green" >Complete Task</Button>
                <Button onClick={increaseCount} icon color="green">
                    <Icon name="right arrow"/>
                </Button>
            </Button.Group>
            <Card className="task-stack" color="green">
                {displayStacks.length>0 ?
                <div>
                    <Card.Content>
                    <Card.Header>
                        <h2>{displayStacks[count].title}</h2>
                    </Card.Header>
                        <Container textAlign="left">
                            Category: {displayStacks[count].category} 
                        </Container>
                        <Divider/>
                        <Container textAlign="justified" className="stack-description">
                            <p>{displayStacks[count].description}</p>
                        </Container>
                        <br></br>
                        <Container className="stack-length" textAlign="right">
                            Length: {displayStacks[count].length} minutes
                        </Container>
                    </Card.Content>
                </div>
                :null
                }
            </Card>
          </div>
            <NewStackModal  open={open} setOpen={setOpen} user={props.user}/>
      </div>
    );
  }
  
  
  export default TaskStack;