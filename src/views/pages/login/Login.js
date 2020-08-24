import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  loginUser,
  getUser,
  clear_login_error
    } from '../../../redux/actions/auth'
import { useHistory } from "react-router";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const token = useSelector(state => state.auth.access_token)
  const role = useSelector(state => state.auth.role)
  const loginerror = useSelector(state => state.auth.login_error)

  const [user_name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const dispatch = useDispatch()

  const showError = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const login = async (e) =>{
    e.preventDefault()
    const user={
      "user_name":user_name,
      "password":password
    }
    
    await dispatch(loginUser(user))
  }

  useEffect(() => {    
    dispatch(getUser(token)) 
  },[token]
    );

  useEffect(() => {
    if (role !== null){
      history.push({pathname:"/dashboard",state:{}})
    }
  },[role]
    );

    useEffect(() => {
      if(loginerror === true){
        showError()
        dispatch(clear_login_error())
      }
    },[loginerror]
      );  

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={
                    async (e)=>{await login(e)}} >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" value={user_name} onChange={(e) => setName(e.target.value)} name="username" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0" >Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>             
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Welcome to this application</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Login Error
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login
