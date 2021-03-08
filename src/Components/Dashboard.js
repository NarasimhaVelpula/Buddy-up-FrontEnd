import React from 'react'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

function Dashboard(props) {
    return (
        <div className="d-flex" style={{height:"100vh"}}>
            <Sidebar id={props.id}/>
            <OpenConversation  id={props.id} />
        </div>
    )
}

export default Dashboard
