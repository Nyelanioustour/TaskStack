import React, { useState } from 'react';
import { Form } from 'semantic-ui-react'
import axios from 'axios';


function SignUpModal() {
    const USERURL = "http://localhost:3000/users"
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  
    function handleUsername(e){
        setUsername(e.target.value)
        console.log(username)
    }
  
    function handlePassword(e){
        setPassword(e.target.value)
        console.log(password)
    }
  
    function signUp(e){
      e.preventDefault()
      let user =   {username: username, password: password}
      console.log(user)
      axios.post(USERURL,{
        user
      }).then(()=>{
        alert("Account Successfully Created!")
        setPassword("")
        setUsername("")
      })
    }
    
    return (
      <Form>
        <Form.Group>
          <Form.Input  label="Username" placeholder="Username" value={username} onChange={(e)=>handleUsername(e)} value={username}></Form.Input>
          <Form.Input  label="Password" placeholder="Pasword" type="password" value={password} onChange={(e)=>handlePassword(e)}></Form.Input>
        </Form.Group>
          <Form.Button onClick={signUp}>Submit</Form.Button>
      </Form>
    );
  }
  
  export default SignUpModal;