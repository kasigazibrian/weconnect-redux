import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const DeleteBusinessModal = (props) => {
  return(
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle} className={props.className}>
        <ModalHeader toggle={props.toggle}>Delete Business</ModalHeader>
        <ModalBody>
          Are you sure you want to delete business with name {props.businessName}?
        </ModalBody>
        <ModalFooter>
          <Button id="delete_business" onClick={props.handleDelete} color="danger">Delete business</Button>
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default DeleteBusinessModal
