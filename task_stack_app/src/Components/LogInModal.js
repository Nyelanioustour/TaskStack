import React, { useState } from 'react';
import { Form } from 'semantic-ui-react'

function LogInModal() {
    const USERURL = "http://localhost:3000/users/login";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    function handleUsername(e){
        setUsername(e.target.value)
        console.log(username)
    }
  
    function handlePassword(e){
        setPassword(e.target.value);
        console.log(password);
    }
  
    function logIn(){
      let user =   {username: username, password: password}
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {user}
        )
      })
      .then(res => res.json())
      .then(data => { 
        console.log(data)
        if(data.error){
          alert(data.error)
          setPassword("")
        }
        else{
          localStorage.token=data.token
          localStorage.username=data.user.username
          window.location.reload();
        }
      })
    }
    
    return (
      <Form>
        <Form.Group>
          <Form.Input  label="Username" placeholder="Username" onChange={(e)=>handleUsername(e)}></Form.Input>
          <Form.Input  label="Password" placeholder="Password" type="password" value={password} onChange={(e)=>handlePassword(e)}></Form.Input>
        </Form.Group>
          <Form.Button onClick={logIn}>Submit</Form.Button>
      </Form>
    );
  }
  
  export default LogInModal;