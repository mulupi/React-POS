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
  CPagination
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import '../users/Users.css';

import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  CreateSupplier,
  getallSuppliers,
  clearErrors
    } from '../../redux/actions/suppliers'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Suppliers = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const SupplierData = useSelector(state => state.suppliers.suppliers_data)
  const supplierRegistrationSuccess=useSelector(state=>state.suppliers.supplier_registration_success)
  const createSupplierError = useSelector(state => state.suppliers.supplier_registration_error)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const [supplier_name, setSupplier_name] = useState("");
  const dispatch = useDispatch();
 

  const createSupplier= async (e)=>{
    e.preventDefault()
    const user={
      "supplier_name":supplier_name
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateSupplier(token,user))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallSuppliers(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/suppliers?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallSuppliers(token))
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
    if(createSupplierError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallSuppliers(token))
      }
      }
      users()
  },[createSupplierError]
    ); 

    useEffect(() => {
      if(supplierRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallSuppliers(token))
        }
        }
        users()
    },[supplierRegistrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Suppliers Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createSupplier(e)}>
              <CFormGroup>
                <CLabel htmlFor="supplier_name">Name of Supplier</CLabel>
                <CTooltip
                    content={`Supplier Name`}
                    placement={'bottom'}
                  >
                <CInput id="supplier_name" value={supplier_name} onChange={(e)=>{setSupplier_name(e.target.value)}} type="text" placeholder="Enter name of supplier" />
                </CTooltip>
              </CFormGroup>             
              
                <CFormGroup row>
                <CCol xs="4">
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create Supplier</CButton> 
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
            Suppliers
          </CCardHeader>
          <CCardBody>
            <CDataTable
            items={SupplierData}
            fields={[
              { key: 'supplier_name', _classes: 'font-weight-bold' },
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
            pages={Math.ceil(SupplierData.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in Supplier Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
          Supplier Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default Suppliers
