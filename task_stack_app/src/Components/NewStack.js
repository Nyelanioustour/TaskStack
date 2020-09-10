import React, { useState } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react'

function NewStack(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [length, setLength] = useState("")
    const STACKURL = "http://localhost:3000/stacks"
    const USERSTACKURL = "http://localhost:3000/user_stacks"

    function handleSubmit(event){
        event.preventDefault()
        let stack = {title: title, description: description, category:category, length:length, user_id:props.user.id}
        
        fetch(STACKURL,{
            method:'post',
            headers:{
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ stack })
        }).then(response=>response.json()).then(data=>{
            window.location.reload()
        }
        )
    }

    function handleTitle(e){
        setTitle(e.target.value)
    }
    function handleDescription(e){
        setDescription(e.target.value)
    }
    function handleLength(e){
        setLength(e.target.value)
    }
    function handleCategory(e){
        setCategory(e.target.value)
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
                <Form.Input onChange={handleLength} label="Length (minutes)" placeholder="Length" value={length} width={5}>
                </Form.Input>
            </Form.Field>
            <Form.Field>
                <Form.Input onChange={handleCategory} label="Category" placeholder="Category" value={category} width={5}></Form.Input>    
            </Form.Field>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
  
  
  export default NewStack;