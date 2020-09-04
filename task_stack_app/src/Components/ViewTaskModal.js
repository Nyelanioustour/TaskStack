import React, { Component, useEffect, useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function ViewTaskModal(props) {

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
        <Button color='green' onClick={() => props.setOpen(false)}>
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