import React, { useContext } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";


const ContactsContext = React.createContext()

export function useContacts (){
    return useContext(ContactsContext)
}

export function ConProvider({ children }) {

    const [contacts , setcontacts] = useLocalStorage('-contacts' , [])

    const CreateContact = (id , name) => {
       setcontacts(prevContacts => {
        return [...prevContacts , {id , name}]
       })
    } 


  return (
    <ContactsContext.Provider value={{contacts , CreateContact}} >
       {children}
    </ContactsContext.Provider>
  )
}