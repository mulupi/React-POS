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
  CButton,
  CPagination,
  CInputFile
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import '../users/Users.css';

import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  CreateBodyTypes,
  getallBodyTypes,
  clearErrors
    } from '../../redux/actions/bikes'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Suppliers = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const BodyData = useSelector(state => state.bikes.body_types_data)
  const bodyRegistrationSuccess=useSelector(state=>state.bikes.body_type_registration_success)
  const createBodyError = useSelector(state => state.bikes.body_type_registration_error)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const [body_name, setbody_name] = useState("");
  const [file_upload, setFile] = useState(undefined);
  const dispatch = useDispatch();
 

  const createBody= async (e)=>{
    e.preventDefault()
    const bodytype={
      "body_name":body_name,
      "file_upload":file_upload
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateBodyTypes(token,bodytype))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallBodyTypes(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/body?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallBodyTypes(token))
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
    if(createBodyError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallBodyTypes(token))
      }
      }
      users()
  },[createBodyError]
    ); 

    useEffect(() => {
      if(bodyRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallBodyTypes(token))
        }
        }
        users()
    },[bodyRegistrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Body Type Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createBody(e)}>
              <CFormGroup row>
                <CLabel htmlFor="body_name" col md={4}>Name of Body</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Body Name`}
                    placement={'bottom'}
                  >
                <CInput id="body_name" value={body_name} onChange={(e)=>{setbody_name(e.target.value)}} type="text" placeholder="Enter name of body" />
                </CTooltip>
                </CCol>
              </CFormGroup> 
              <CFormGroup row>
                  <CLabel col md={4}>Image</CLabel>
                  <CCol xs="12" md="8">
                  <CTooltip
                    content={`This is the image of the bike body`}
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
                <CCol xs="5">
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create Body Type</CButton> 
                </CCol>
                <CCol xs="5">
                <CButton type="reset" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol> 
        <CCol className={!show? "users_table": ""} xs="6" sm="6" >
        
        <CCard>
          <CCardHeader>
            Body Types
          </CCardHeader>
          <CCardBody>
            <CDataTable
            items={BodyData}
            fields={[
              { key: 'body_name', _classes: 'font-weight-bold' },
              'entry_date'
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
            pages={Math.ceil(BodyData.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in Body Type Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
        Body Type Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default Suppliers
