import React from 'react'
import { ListGroup } from 'react-bootstrap'

function Contacts({contacts,createConversation,id,setActiveKey}) {
    return (
        <div>
           
            <ListGroup variant="flush">
      {contacts.map((contact,ids) => (
        <ListGroup.Item key={ids} onClick={()=>{setActiveKey('conversations');createConversation([contact[0]])}}>
          {contact}
         
        </ListGroup.Item>
      ))}
    </ListGroup>
        </div>
    )
}

export default Contacts
