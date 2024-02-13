import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useConversations } from '../contexts/CovProvider'

export default function Convsersation() {

  const { Conversations , selConInd} = useConversations ()

  return (
    <>
      <ListGroup variant='flush'>
      {Conversations.map((Conversation , index ) => (
        <ListGroupItem 
        key={index}
        action
        onClick={() => selConInd(index)}
        active={Conversation.selected}
        >
          {Conversation.recipients.map(recipient => recipient.name).join(', ')}
        </ListGroupItem>
      ))}
    </ListGroup>
    </>
  )
}
