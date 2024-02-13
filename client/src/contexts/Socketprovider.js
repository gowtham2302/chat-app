import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export  function useSocket () {
    return useContext(SocketContext)
}

export  function Socketprovider({id , children}) {

    const [socket , setsocket] = useState()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',  {query : {id}}
        )
        setsocket(newSocket)

        return () => newSocket.close()

    } , [id])

  return (
    <SocketContext.Provider value={socket}>
       {children}
    </SocketContext.Provider>
  )
}
