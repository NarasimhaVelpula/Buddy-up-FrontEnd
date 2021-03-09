import React,{useContext, useEffect, useState,useCallback} from 'react'
import useLocalStorage from '../Hooks/useLocalStorage'
import {useSocket} from './SocketProvider'

import messageSound from '../sounds/message.mp3'
const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

function ConversationProvider({children,id}) {
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversion,setSelectedConversion]=useState(0)
    const [contacts,setContacts]=useState([])
    const socket=useSocket()
    
    function createConversation(recipients) {
        recipients.push(id)
        console.log(recipients)
        setConversations(prevConversations => {
          return [...prevConversations, { recipients, messages: [] }]
        })
      }
   
    const addMessageToConversation=useCallback(({recipients,text,sender})=>{
        if(sender!==id){
            var audio=new Audio(messageSound)
            audio.play()
        }
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
    },[setConversations,id])
   
    useEffect(() => {
        if (socket == null) return
    
        socket.on('receive-message', addMessageToConversation)
        socket.on('Get-Contacts',({contacts})=>{
            setContacts(contacts)
        })
        return () => socket.off('receive-message')
      }, [socket, addMessageToConversation])
    
      function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text })
    
        addMessageToConversation({recipients, text, sender:id} )
      }
    return (
        <ConversationsContext.Provider value={{conversations,createConversation,selectedConversion,setSelectedConversion,sendMessage,contacts}}>
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
