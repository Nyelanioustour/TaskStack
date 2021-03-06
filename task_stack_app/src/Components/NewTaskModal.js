import React, { Component, useEffect, useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import NewTask from './NewTask.js'

function NewTaskModal(props) {

  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
    >
      <Modal.Header>Enter New Task Details</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            <NewTask start={props.start} end={props.end} setOpen={props.setOpen} user={props.user} updateEvents={props.updateEvents} getTasks={props.getTasks}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => props.setOpen(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default NewTaskModal