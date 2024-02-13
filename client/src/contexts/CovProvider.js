import React, { useContext, useEffect, useState, useCallback} from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from '../contexts/ConProvider'
import { useSocket } from './Socketprovider';

const ConversationsContext = React.createContext()

export function useConversations (){
    return useContext(ConversationsContext)
}

export function CovProvider({ id ,children }) {

    const {contacts} = useContacts()

    const [selConInd ,setselConInd] = useState(0)

    const socket = useSocket()

    const [Conversations , setConversations] = useLocalStorage('-Conversations' , [])

    const CreateConversation = (recipients) => {
       setConversations(prevConversations => {
        return [...prevConversations , {recipients , messages: []}]
       })
    } 

    const f_Conversation = Conversations.map((Conversation, index) => {

        const recipients = Conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return{id : recipient , name}
        })

        const messages = Conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender   
            const fromMe = id === message.sender    
            return {...message , senderName : name , fromMe}
        })


        const selected = index === selConInd
        return {...Conversation , messages ,recipients , selected}
    })

 

    const addMessagetoconvo = useCallback(({recipients , text , sender}) => {
         setConversations(prevConversations => {
            let madeChange = false
            const newMessage = {sender , text}

            let newConversation = prevConversations.map(Conversation => {
                if (arrayEquality(Conversation.recipients , recipients)){
                    madeChange = true
                    return {
                        ...Conversation ,
                        messages : [...Conversation.messages , newMessage]
                    }
                }
                return Conversation
            })

            if (madeChange) {
                   return newConversation
            } else{
              return [
                ...prevConversations ,
                {recipients , messages : [newMessage]}
              ]
            }
         })
    } ,[setConversations])

    useEffect(() =>{
        if (socket == null) return

        socket.on('recieve-message' , addMessagetoconvo)

        return () => socket.off('recieve-message')

     } ,[socket , addMessagetoconvo])


    const sendMessage = (recipients , text) => {
        socket.emit('send-message' , {recipients , text})
        
        addMessagetoconvo({recipients , text , sender:id})
    }

  return (
    <ConversationsContext.Provider value={{ 
        Conversations : f_Conversation ,
        CreateConversation , 
        selConInd : setselConInd, 
        selectedConversation : f_Conversation[selConInd],
        sendMessage
        }} >
       {children}
    </ConversationsContext.Provider>
  )
}

const arrayEquality = (a,b) => {
   if(a.length !== b.length) return false

   a.sort()
   b.sort()

   return a.every((element , index) => {
    return element === b[index]
   })
}