import React, { useState } from 'react'
import { Button, Form, FormGroup, ModalBody, ModalHeader } from 'react-bootstrap'
import { useContacts } from '../contexts/ConProvider'
import { useConversations } from '../contexts/CovProvider'

export default function CovModel({close}) {

  const [selectedConID ,setselectedConID] = useState([])
  const {contacts} = useContacts()
  const {CreateConversation} = useConversations()

  const handleCheck = (contactId) => {
    setselectedConID(prevsetselectedConID =>{
      if (prevsetselectedConID.includes(contactId) ){
         return prevsetselectedConID.filter(prevId =>{
          return contactId!==prevId
         })
      }else{
        return [...prevsetselectedConID , contactId]
      }
    })
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    CreateConversation(selectedConID)
    close()
   }

  return (       
    <>
    <ModalHeader closeButton>
     Create New Convsersation
    </ModalHeader>
    <ModalBody>
        <Form onSubmit={handleSubmit}>
           {contacts.map(contact => (
            <FormGroup controlId={contact.id} key={contact.id}>
             <Form.Check type='checkbox' value={selectedConID.includes(contact.id)}
             label={contact.name} onChange={()=> handleCheck(contact.id)} className="mb-3"
             />
            </FormGroup>
           ))}
            <Button className='mt-2' type='submit'> Create</Button>
        </Form>
    </ModalBody>
    </>
  )
}
