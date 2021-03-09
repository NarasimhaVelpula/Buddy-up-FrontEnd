import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
  }

function SocketProvider({children,id}) {
    const [socket, setSocket] = useState()

    useEffect(()=>{
        const newSocket=io(
            'http://127.0.0.1:5000/',
            {query:{id}}
        )
        setSocket(newSocket)
        return ()=>newSocket.close()
    },[id])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
