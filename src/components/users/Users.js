import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
  CForm,
  CLabel,
  CInput,
  CFormGroup,
  CInputRadio,
  CButton,
  CInputFile,
  CPagination
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import './Users.css';

import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  CreateManager,
  CreateAttendant,
  getallUsers,
  clearErrors
    } from '../../redux/actions/users'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Users = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const usersData = useSelector(state => state.users.users_data)
  const registrationSuccess=useSelector(state=>state.users.user_registration_success)
  const createUserError = useSelector(state => state.users.user_registration_error)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);  

  const [id_number, setID] = useState("");
  const [file_upload, setFile] = useState(undefined);
  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [middle_name, setMname] = useState("");
  const [last_name, setLname] = useState("");
  const [usertype, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 

  const createUser= async (e)=>{
    e.preventDefault()
    const user={
      "id_number":id_number,
      "user_name":user_name,
      "first_name":first_name,
      "middle_name":middle_name,
      "last_name":last_name,
      "password":password,
      "email":email,
      "file_upload":file_upload
    }
    if(usertype==="manager"){
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateManager(token,user))
      }
    }
    if(usertype==="attendant"){
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateAttendant(token,user))
      }
    }
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallUsers(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallUsers(token))
      }
    }
    users()
  },[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setSuccess(false);
  }

  useEffect(() => {
    if(createUserError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallUsers(token))
      }
      }
      users()
  },[createUserError]
    ); 

    useEffect(() => {
      if(registrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallUsers(token))
        }
        }
        users()
    },[registrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              User Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createUser(e)}>
              <CFormGroup>
                <CLabel htmlFor="id_number">ID Number</CLabel>
                <CTooltip
                    content={`National ID number`}
                    placement={'bottom'}
                  >
                <CInput id="id_number" value={id_number} onChange={(e)=>{setID(e.target.value)}} type="number" placeholder="Enter ID Number example: 32655412" />
                </CTooltip>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="user_name">User Name</CLabel>
                <CTooltip
                    content={`Will be used during login`}
                    placement={'bottom'}
                  >
                <CInput id="user_name" placeholder="enter a user name" value={user_name} onChange={(e)=>{setUsername(e.target.value)}} />
                </CTooltip>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="email">Email</CLabel>
                <CTooltip
                    content={`Enter email address`}
                    placement={'bottom'}
                  >
                <CInput required id="email" type="email" placeholder="yadayadayada@gmail.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </CTooltip>
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="first_name">First Name</CLabel>
                    <CTooltip
                    content={`First name as per the ID`}
                    placement={'bottom'}
                  >
                    <CInput id="first_name" placeholder="First Name" value={first_name} onChange={(e)=>{setFname(e.target.value)}} />
                    </CTooltip>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="middle_name">Middle Name</CLabel>
                    <CTooltip
                    content={`Middle name as per the ID`}
                    placement={'bottom'}
                  >
                    <CInput id="middle_name" placeholder="Middle Name" value={middle_name} onChange={(e)=>{setMname(e.target.value)}}/>
                    </CTooltip>
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="last_name">Last Name</CLabel>
                <CTooltip
                    content={`Last name as per the ID`}
                    placement={'bottom'}
                  >
                <CInput id="last_name" placeholder="Last Name" value={last_name} onChange={(e)=>{setLname(e.target.value)}}/>
                </CTooltip>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="password">Password</CLabel>
                <CTooltip
                    content={`Password for account`}
                    placement={'bottom'}
                  >
                <CInput required id="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </CTooltip>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="cpassword">Confirm Password</CLabel>
                <CTooltip
                    content={`Confirm password`}
                    placement={'bottom'}
                  >
                <CInput required id="cpassword" type="password"  />
                </CTooltip>
              </CFormGroup>
              <CFormGroup row>
                  <CLabel col md={3}>Image</CLabel>
                  <CCol xs="12" md="9">
                  <CTooltip
                    content={`This image will be used as profile image`}
                    placement={'bottom'}
                  >
                    <CInputFile custom id="image" onChange={(e)=>{setFile(e.target.files[0])}}/>
                    </CTooltip>
                    <CLabel htmlFor="image" variant="custom-file">
                      Choose file...
                    </CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>User Type:</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="checkbox">
                      <CInputRadio className="form-check-input" id="manager_radio" name="radios" value="manager" onClick={(e)=>setUserType(e.target.value)}/>
                      <CLabel variant="checkbox" htmlFor="manager_radio">Manager</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox">
                      <CInputRadio className="form-check-input" id="attendant_radio" name="radios" value="attendant" onClick={(e)=>setUserType(e.target.value)} />
                      <CLabel variant="checkbox" htmlFor="attendant_radio">Attendant</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                <CCol xs="4">
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create User</CButton> 
                </CCol>
                <CButton type="reset" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol> 
        <CCol className={!show? "users_table": ""} xs="6" sm="6" >
        
        <CCard>
          <CCardHeader>
            Users
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersData}
            fields={[
              { key: 'name', _classes: 'font-weight-bold' },
              'date_joined', 'role'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.id}`)}
            
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={Math.ceil(usersData.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in User Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
          User Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default Users
