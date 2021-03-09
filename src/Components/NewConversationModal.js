import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import {Form, Modal} from 'react-bootstrap'
import {useConversations} from './ConversationProvider'
function NewConversationModal({closeModal}) {
    const [selectedContactIds,setSelectedContactIds]=useState([])
    
    const handleCheck=(item)=>{
            setSelectedContactIds(prevSelectedIds=>{
                if(prevSelectedIds.includes(item)){
                    prevSelectedIds.splice(prevSelectedIds.indexOf(item),1)

                    return prevSelectedIds
                }
                else{
                    return [...prevSelectedIds,item]
                }
            })
    }
        const {createConversation,contacts}=useConversations()
        const contactsList=Object.entries(contacts).map(contact=>{
            return contact[0]
        })
    const handleSubmit=(e)=>{
        e.preventDefault()
        createConversation(selectedContactIds)
        closeModal()
    }
    return (
        <div>

            <Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                            {contactsList.map(item=>{
                                return(
                                    <Form.Group controlId={item} key={item}>
                                            <Form.Check 
                                            type="checkbox"
                                            label={item}
                                            onChange={()=>{handleCheck(item)}}
                                            value={selectedContactIds.includes(item)}
                                            />
                                    </Form.Group>
                                )
                            })}
                             <Button type="submit">Create</Button>
                    </Form>
                  
                </Modal.Body>
            </Modal.Header>
        </div>
    )
}

export default NewConversationModal
