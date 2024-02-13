import React, { useCallback, useState } from 'react'
import {Button, Form, FormControl, FormGroup, InputGroup} from 'react-bootstrap'
import { useConversations } from '../contexts/CovProvider'

export default function Openconversation() {
    const [text, settext] = useState('')
    const {sendMessage , selectedConversation} = useConversations()
    const setRef = useCallback(node => {
      if(node){
        node.scrollIntoView({smooth:true})
      }
    },[])

    const handleSubmit = (e) => {
      e.preventDefault()

      sendMessage(
        selectedConversation.recipients.map(recipient => recipient.id) ,
        text
      )

      settext('')
    }
    
    const lastMessage = selectedConversation.messages.length - 1 

  return (
    <div className='d-flex flex-column flex-grow-1'>
       <div className='flex-grow-1 overflow-auto'>
         <div className='d-flex flex-column align-items-start justify-content-end px-3'>
            {selectedConversation.messages.map((message , index) => {
              return (
                <div ref={lastMessage ? setRef :null} key={index} 
                className={`my-1 d-flex flex-column ${message.fromMe ?'align-self-end align-items-end':'align-items-start '} mt-3`}>
                  <div className={`rounded px-2 py-2  ${message.fromMe ? 'bg-primary text-white': 'border'}`} >
                    {message.text}
                  </div>
                    {console.log(message)}
                  <div className={`text-muted small ${message.fromMe ? 'text-right': ''}`}>
                     {message.fromMe ? 'you' : message.senderName}
                  </div>
                </div>
              )
            })}
         </div>
       </div>
       <Form onSubmit={handleSubmit}>
         <FormGroup className='m-3'>
            <InputGroup>
            <FormControl as='textarea' value={text} required
            onChange={(e)=> settext(e.target.value)}
            style={{height:'70px' , resize: 'none' }}
            />
            <Button type='submit'>Send</Button>            
            </InputGroup>
         </FormGroup>
       </Form>

    </div>
  )
}
