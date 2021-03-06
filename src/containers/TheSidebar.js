import React from 'react'
import { useSelector } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
// sidebar nav config
import manager from './_navadmin'
import attendant from './_navattendant'
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons'

const TheSidebar = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const decoded = jwt_decode(token)
  const selected_role=decoded["role"]
  const menu_selector=(selected_role)=>{
    if (selected_role==="Attendant"){
      return attendant
    }
    else if(selected_role==="Manager"){
      return manager
    }
  }
  const menu=menu_selector(selected_role)

  return (    
    <CSidebar
      show={show}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
      <FontAwesomeIcon icon={faMotorcycle} size="2x"/>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={menu}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
