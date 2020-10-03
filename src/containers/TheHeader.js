import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  sidebar
    } from '../redux/actions/dashboard'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif
}  from './index'
import jwt_decode from "jwt-decode";

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.dashboard.sidebarShow)
  const token = useSelector(state => state.auth.access_token)
  const selected_role = jwt_decode(token)["role"]

  const showRegUser=()=>(
    selected_role==="Manager" &&
    <CHeaderNavItem  className="px-3">
    <CHeaderNavLink to="/users">Users</CHeaderNavLink>
  </CHeaderNavItem>
  )

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : true
    dispatch(sidebar(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : false
    dispatch(sidebar(val))
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>

        {showRegUser()}

        
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
