import React, { useState } from 'react';
import { Button, Form, TextArea, Modal } from 'semantic-ui-react'

function EditTask(props) {
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [date, setDate] = useState("")
    const [start, setStart] = useState(props.start)
    const [end, setEnd] = useState(props.end)
    const [open, setOpen] = React.useState(false)
    const TASKURL = "http://localhost:3000/tasks" + "/" + props.ID
    const USERTASKURL = "http://localhost:3000/user_tasks"

    function handleSubmit(event){
        event.preventDefault()
        let task = {title: title, description: description, start:start, end:end}
        
        fetch(TASKURL,{
            method:'PATCH',
            headers:{
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ task })
        }).then(response=>response.json()).then(data=>{
            // window.location.reload()
            props.getTasks()
            props.setOpen(false)
            setOpen(false)
        }
        )
    }

    function handleDelete(){
        fetch(TASKURL,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response=>response.json()).then(data=>{
            // window.location.reload()
            props.getTasks()
            props.setOpen(false)
            setOpen(false)
        })
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
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color="green">Edit</Button>}
            >
                <Modal.Content>
                    <Modal.Header><h1>Editing Task</h1></Modal.Header>
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
                        <Button color="black" onClick={handleDelete}>Delete</Button>
                    </Form>
                </Modal.Content>
            </Modal>
      </div>
    );
  }
  
  
  export default EditTask;