import React, { useRef } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, ModalBody, ModalHeader } from 'react-bootstrap'
import { useContacts } from '../contexts/ConProvider'



export default function ConModel( {close}) {

   const idRef = useRef()
   const nameRef = useRef()
   const {CreateContact} = useContacts()
   

    const handleSubmit = (e) => {
     e.preventDefault()
     CreateContact (idRef.current.value , nameRef.current.value)
     close()
    }


  return (
    <>
    <ModalHeader closeButton>
     Create New Contact
    </ModalHeader>
    <ModalBody>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel> ID </FormLabel>
                <FormControl type='text' required ref={idRef} />
            </FormGroup>
            <FormGroup>
                <FormLabel> Name </FormLabel>
                <FormControl type='text' required ref={nameRef} />
            </FormGroup>
            <Button className='mt-2' type='submit'> Create</Button>
        </Form>
    </ModalBody>
    </>
  )
}
