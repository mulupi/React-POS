import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  useSelector,
  useDispatch
 } from 'react-redux'
 import {
   logout
    } from '../redux/actions/auth'
import jwt_decode from "jwt-decode";
import{
  URL
} from '../Constants'

const TheHeaderDropdown = () => {
  const token = useSelector(state => state.auth.access_token)
  const decoded = jwt_decode(token)
  const user_name = decoded["user_id"]
  const file_upload = URL+decoded["image"]
  const selected_role =decoded["role"]
  const dispatch = useDispatch()

  const onLogout=()=>{    
    dispatch(logout)
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={file_upload}
            className="c-avatar-img"
            alt={user_name}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>{user_name} - {selected_role}</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" /> 
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" /> 
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>        
        <CDropdownItem divider />
        <CDropdownItem onClick={onLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
