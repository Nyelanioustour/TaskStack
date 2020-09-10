import React, { Component, useEffect, useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import EditTask from './EditTask';

function ViewTaskModal(props) {
  const TASKURL = `http://localhost:3000/tasks`
  const USERTASKURL = `http://localhost:3000/user_tasks`
  const USERURL = "http://localhost:3000/users";

  function completeTask(){
    
    let task = {color:"darkgreen"}
    let URL = TASKURL+'/'+props.ID

    fetch(URL,{
        method:'PATCH',
        headers:{
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ task })
      }).then(response=>response.json()).then(()=>{
        let user_task = {user_id:props.user.id, task_id:props.ID}
        let URL = 
        fetch(USERTASKURL,{
          method:'PATCH',
          headers:{
              Authorization: `Bearer ${localStorage.token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ user_task })
      }).then(response=>response.json()).then(data=>console.log(data))
        // window.location.reload()
        props.getTasks()
      }
      )}


  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
    >
      <Modal.Header>Title: {props.title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            <h3>
            Description: {props.description}
            </h3>
            <h3>
            Start Date: {props.start}
            </h3>
            <h3>
            End Date: {props.end}
            </h3>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div className="edit-button">
        <EditTask title={props.title} description={props.description} start={props.start} end={props.end} ID={props.ID} getTasks={props.getTasks} setOpen={props.setOpen}/>
        </div>
        <Button color='green' onClick={() => 
          {props.setOpen(false)
          completeTask()}}>
          Complete
        </Button>
        <Button color='black' onClick={() => props.setOpen(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ViewTaskModal