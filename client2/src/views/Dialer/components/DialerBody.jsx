import { CardText , CardBody , ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem , Card } from 'reactstrap'
// import DialerBody from './DialerBody'
// import DialerFotter from './DialerFooter'
import React, { useState } from 'react'
import { Notes } from './Notes'
import { selectThemeColors } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeStatus } from '../../../redux/actions/lead'
const options = [
    {
        value:'test',
        name:'test'
    }
]

const DialerBody = () => {
    const dispatch = useDispatch()
    const leadData = useSelector((state) => state.lead)

    const DropdownControlled = () => {
        const [dropdownOpen, setDropdownOpen] = useState(false)
        const [status, setStatus] = useState('חדש')

        const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen)
        }

        const changeStatus = (newStatus) => {
            dispatch(handleChangeStatus(newStatus))
            // setStatus()
        }


        
        return (
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}  className="w-100 text-right">
                <DropdownToggle color='primary' caret className="w-100 text-left">
                    {leadData.newStatus === undefined ? leadData.oldStatus : leadData.newStatus }
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => changeStatus('אין מענה')} className="w-100">אין מענה</DropdownItem>
                    <DropdownItem onClick={() => changeStatus('בטיפול')} className="w-100">
                    בטיפול
                    </DropdownItem>
                    <DropdownItem onClick={() => changeStatus('בהמתנה')}  className="w-100">בהמתנה</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )
    }


    return (
    <Card>
        <CardBody>
            <h3>{leadData.name} - {leadData.product}</h3>
            <hr/>
            <div className="dialerUserData font-weight-bolder flex-wrap">
                <div className="d-flex flex-column ">
                    <span >פאלפון:</span>
                    <span >{leadData.phone}</span>
                </div>
                <div className="d-flex flex-column">
                    <span>אימייל:</span>
                    <span className="" >{leadData.email}</span>
                </div>
            </div>
            
            <div className="d-flex flex-column font-weight-bolder mt-1">
                <span>סטטוס:</span>
                <DropdownControlled></DropdownControlled>
            </div>
            <hr/>

            <Notes/>
        </CardBody>

    </Card>
    

    )
  }

export  default DialerBody