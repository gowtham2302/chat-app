import React , {useRef}from 'react'
import {Container , Form , Button} from 'react-bootstrap'
import './Login.css'
import {v4 as uuidV4} from 'uuid'

export default function Login({setid}) {

  const idRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setid(idRef.current.value)
  }
  
  const createNewId= () => {
    setid(uuidV4())
  } 

  return (
    <div className='whole-body'>
    <div className='box'>	
    <div className='wave -one'></div>
    <div className='wave -two'></div>
    <div className='wave -three'></div>
    </div>
    <Container className="align-items-center d-flex login ">
    <Form className='w-100 z' onSubmit={handleSubmit}>
       <Form.Group className="mb-3" >
        <Form.Label className='h4'> ID </Form.Label>
         <Form.Control type="text"  ref={idRef} placeholder=" Enter your ID here" className='shadow p-3 mb-3 bg-white'/>
       </Form.Group>
     <Button variant="primary" type="submit" className='me-2'>Login</Button>
     <Button variant='secondary' onClick={createNewId}>Create a new ID</Button>
     </Form>
    </Container>
    </div>
  )
}
