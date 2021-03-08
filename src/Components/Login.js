import React,{useRef} from 'react'
import {Container,Form,Button} from 'react-bootstrap'

function Login(props) {
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.onIdSubmit(idRef.current.value)
    }
    const CreateNewUser=(e)=>{
        var Name=prompt("Enter Your Name")
        console.log(Name)
    }
    const idRef = useRef()
    return (
        <Container className="align-items-center d-flex" style={{height:"80vh"}}>
            <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label>Enter Your Id</Form.Label>
                <Form.Control type="text" ref={idRef}></Form.Control>

            </Form.Group>
            <Button type="submit" className="mr-2">Login</Button>
            <Button variant="secondary" onClick={CreateNewUser}>Create New User</Button>
          </Form>
        </Container>
    )
}

export default Login
