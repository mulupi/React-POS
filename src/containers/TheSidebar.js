import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

import CIcon from '@coreui/icons-react'
// sidebar nav config
import manager from './_navadmin'
import attendant from './_navattendant'

const TheSidebar = () => {
  const dispatch = useDispatch()
  //const show = useSelector(state => state.auth.sidebarShow)
  const show = true
  const selected_role = useSelector(state => state.auth.role)
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
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
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
