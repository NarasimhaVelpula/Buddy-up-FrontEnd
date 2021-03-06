import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from './ConversationProvider'
function Conversation() {
    const {conversations,selectedConversion,setSelectedConversion}=useConversations()
    
    const selectConversation=ind=>{
        setSelectedConversion(ind)
    }
    return (
        <ListGroup variant="flush">
                {conversations.map((conv,index)=>{
                    return(
                        <ListGroup.Item key={index} 
                            action
                            onClick={()=>{selectConversation(index)}}
                            active={index===selectedConversion}
                        >
                           
                            {conv.recipients.map(name=>{
                                return name
                            }).join(',')}
                        </ListGroup.Item>
                    )
                })}
        </ListGroup>
    )
}

export default Conversation
