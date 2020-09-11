import React, { Component, useEffect, useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import NewStack from './NewStack.js'

function NewStackModal(props) {

  return (
    <Modal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
    >
      <Modal.Header>Enter New Task Details</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            <NewStack user={props.user} getStacks={props.getStacks} setOpen={props.setOpen} setCount={props.setCount}/>
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

export default NewStackModal