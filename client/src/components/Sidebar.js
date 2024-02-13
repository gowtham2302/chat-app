import React, { useState } from 'react'
import { Nav, TabContainer, NavItem, NavLink, TabPane, TabContent ,Button, Modal} from 'react-bootstrap'
import Convsersation from './Convsersation'
import Contacts from './Contacts'
import ConModel from './ConModel'
import CovModel from './CovModel'

const COV = 'conversation' 
const CON = 'contacts'


export default function Sidebar({id}) {

    const [open , setopen] = useState(false)
    const [act , setact] = useState(COV)
    const bt = act === COV

    const close = () => {
        setopen(false)
    }

  return (
    <div  className='d-flex flex-column'  style={{width : '250px'}}>
        <TabContainer activeKey={act} onSelect={setact}>
            <Nav variant='tabs' className='justify-content-center'>
                <NavItem>
                    <NavLink eventKey={COV}>
                        conversation
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink eventKey={CON}>
                        contacts
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='border-end overflow-auto flex-grow-1'>
               <TabPane eventKey={COV}>
                  <Convsersation/>
                </TabPane>
                <TabPane eventKey={CON}>
                  <Contacts/>
                </TabPane>
            </TabContent>
            <div className='border-top border-end p-2 small' >
                Your ID : <span className='text-muted' >{id}</span>
            </div>
            <Button  onClick={() => setopen(true)}  className='rounded-0'>
                New {bt ? 'Convsersation' : 'Contacts'}
            </Button>
        </TabContainer>


        <Modal show={open} onHide={close}>
            {bt ? <CovModel close = {close}/> : <ConModel close = {close}/> }
        </Modal>
        
    </div>
  )
}

// {id}