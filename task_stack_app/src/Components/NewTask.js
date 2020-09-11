import React, { useState } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react'

function NewTask(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [start, setStart] = useState(props.start)
    const [end, setEnd] = useState(props.end)
    const TASKURL = "http://localhost:3000/tasks"
    const USERTASKURL = "http://localhost:3000/user_tasks"

    function handleSubmit(event){
        event.preventDefault()
        let task = {title: title, description: description, start:start, end:end, user_id:props.user.id, color:"darkcyan"}
        
        fetch(TASKURL,{
            method:'post',
            headers:{
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ task })
        }).then(response=>response.json()).then(data=>{
            props.getTasks()
            props.setOpen(false)
        }
        )
    }

    function handleTitle(e){
        setTitle(e.target.value)
    }
    function handleDescription(e){
        setDescription(e.target.value)
    }
    function handleStart(e){
        setStart(e.target.value)
    }
    function handleEnd(e){
        setEnd(e.target.value)
    }
  
    return (
      <div className="new-task">
        <Form>
            <Form.Field>
                <Form.Input onChange={handleTitle} label="Title" placeholder="Title" value={title} width={5}></Form.Input>    
            </Form.Field>
            <Form.Field>
                <Form.Input onChange={handleDescription} 
                label="Description" placeholder="Description" control={TextArea}
                value={description} width={10}></Form.Input>    
            </Form.Field>
            <Form.Field>
                <Form.Input onChange={handleStart} label="Start Date" placeholder="Start Time" value={start} width={5}>
                </Form.Input>    
            </Form.Field>
            <Form.Field>
                <Form.Input onChange={handleEnd} label="End Date" placeholder="End Time" value={end} width={5}></Form.Input>    
            </Form.Field>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
  
  
  export default NewTask;