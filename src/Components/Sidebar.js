import React,{useState} from 'react'
import {Tab,Nav,Button,Modal} from 'react-bootstrap'
import Contacts from './Contacts'
import Conversation from './Conversation'
import NewConversationModal from './NewConversationModal'
const CONVERSATION_kEY="conversations"
const CONTACT_KEY="contacts"
function Sidebar(props) {
    const [activeKey,setActiveKey]=useState(CONVERSATION_kEY)
    const [modalStatus,setModalStatus]=useState(false)
    const closeModal=()=>{
        setModalStatus(false)
    }
    const openConversationModal=()=>{
        setModalStatus(true)
    }
    return (
        <div style={{width:"250px"}} className="d-flex flex-column">
            <div className="p-2 border-top border-right small">
                Hello <span className="text-muted">{props.id}</span>
            </div>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item >
                        <Nav.Link eventKey={CONVERSATION_kEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                       <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="d-flex flex-grow-1 border-right overflow-auto">
                    <Tab.Pane eventKey={CONVERSATION_kEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                {activeKey===CONVERSATION_kEY?<Button className="rounded-0" onClick={openConversationModal}>Create New Conversation</Button>:''}
            </Tab.Container>
            <Tab.Container>
                    {activeKey===CONVERSATION_kEY?<Modal show={modalStatus} onHide={closeModal}><NewConversationModal closeModal={closeModal} /> </Modal>:''}
            </Tab.Container>

        </div>
    )
}

export default Sidebar
