import React, { useState } from 'react';
import { Form } from 'semantic-ui-react'

function LogInModal(props) {
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
        localStorage.token=data.token
        props.setUser(data.user)
        props.switchCalendar()
      })
    }
    
    return (
      <Form>
        <Form.Group>
          <Form.Input  label="Username" placeholder="Username" onChange={(e)=>handleUsername(e)}></Form.Input>
          <Form.Input  label="Password" placeholder="Pasword" type="password" onChange={(e)=>handlePassword(e)}></Form.Input>
        </Form.Group>
          <Form.Button onClick={logIn}>Submit</Form.Button>
      </Form>
    );
  }
  
  export default LogInModal;