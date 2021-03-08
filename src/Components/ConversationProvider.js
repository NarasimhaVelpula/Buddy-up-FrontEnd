import React,{useContext, useEffect, useState,useCallback} from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import {useSocket} from './SocketProvider'
const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

function ConversationProvider({children,id}) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversion,setSelectedConversion]=useState(0)
    const socket=useSocket()
    console.log(socket)
    function createConversation(recipients) {
        recipients.push(id)
        setConversations(prevConversations => {
          return [...prevConversations, { recipients, messages: [] }]
        })
      }
    const addMessageToConversation=useCallback(({recipients,text,sender})=>{
        setConversations(prevConv=>{
            let madeChanges=false
            const newMessage={sender,text}
            let newConversations=prevConv.map(conv=>{
                if(arrayEquality(conv.recipients,recipients)){
                    madeChanges=true
                    return {
                        ...conv,
                        messages:[...conv.messages,newMessage]
                    }
                }
                else{
                    return conv
                }
            })
            if(madeChanges){
                    return newConversations
            }
            else{
                return [...prevConv,{recipients,messages:[newMessage]}]
            }
    })
    },[setConversations])
    useEffect(() => {
        if (socket == null) return
    
        socket.on('receive-message', addMessageToConversation)
    
        return () => socket.off('receive-message')
      }, [socket, addMessageToConversation])
    
      function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text })
    
        addMessageToConversation({recipients, text, sender:id} )
      }
    return (
        <ConversationsContext.Provider value={{conversations,createConversation,selectedConversion,setSelectedConversion,sendMessage}}>
            {children}
        </ConversationsContext.Provider>
    )
}
function arrayEquality(a,b){
    console.log(a,b)
    if(a.length!==b.length) return false
    a.sort()
    b.sort()
    return a.every((element,index)=>{
        return element=== b[index]
    })
}

export default ConversationProvider
