import React, { useState } from 'react'
import {Form, InputGroup,Button} from 'react-bootstrap'
import { useConversations } from './ConversationProvider'

function OpenConversation({id}) {
    const [text,setText]=useState()
    
    const {sendMessage,selectedConversion,conversations}=useConversations()
    const handleSubmit=e=>{
        e.preventDefault()
        sendMessage(conversations[selectedConversion].recipients,text)
        setText('')
    }
    if(conversations.length>0)
    {
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                        {conversations[selectedConversion].messages.map((message,index)=>{
                            let fromMe=message.sender===id
                            return (
                                <div key={index}

                                className= {`m-1 d-flex flex-column ${fromMe? 'align-self-end':''}`}
                                >
                                    <div className={`rounded px-2 py-1 ${fromMe? 'bg-primary text-white':'border'}`}>{message.text}</div>
                                    <div className={`text-muted small ${fromMe?'text-right':'text-right'}`}>{message.sender}</div>
                                </div>
                            )
                        })}
                </div>
            </div>
                <Form onSubmit={handleSubmit}> 
                    <Form.Group className="m-2 d-flex">
                        <InputGroup>
                            <Form.Control required value={text} onChange={e=>{setText(e.target.value)}}
                            style={{height:"75px","resize":"none"}} />
                            <Button style={{height:"75px","resize":"none"}} className="rounded-0" type="submit">Send</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
           
        </div>
    )
                    }
    else{
        return null
    }
}

export default OpenConversation
