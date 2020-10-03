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
  CreateBrand,
  getallBrands,
  clearErrors
    } from '../../redux/actions/bikes'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Brands = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const BrandData = useSelector(state => state.bikes.brands_data)
  const brandRegistrationSuccess=useSelector(state=>state.bikes.brand_registration_success)
  const createBrandError = useSelector(state => state.bikes.brand_registration_error)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const [brand_name, setbrand_name] = useState("");
  const dispatch = useDispatch();
 

  const createBrand= async (e)=>{
    e.preventDefault()
    const brand={
      "brand_name":brand_name
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateBrand(token,brand))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallBrands(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/brands?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallBrands(token))
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
    if(createBrandError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallBrands(token))
      }
      }
      users()
  },[createBrandError]
    ); 

    useEffect(() => {
      if(brandRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallBrands(token))
        }
        }
        users()
    },[brandRegistrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Brand Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createBrand(e)}>
              <CFormGroup>
                <CLabel htmlFor="brand_name">Name of Brand</CLabel>
                <CTooltip
                    content={`Brand Name`}
                    placement={'bottom'}
                  >
                <CInput id="brand_name" value={brand_name} onChange={(e)=>{setbrand_name(e.target.value)}} type="text" placeholder="Enter name of Brand" />
                </CTooltip>
              </CFormGroup>             
              
                <CFormGroup row>
                <CCol xs="4">
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create Brand</CButton> 
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
            Brands
          </CCardHeader>
          <CCardBody>
            <CDataTable
            items={BrandData}
            fields={[
              { key: 'brand_name', _classes: 'font-weight-bold' },
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
            pages={Math.ceil(BrandData.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in Brand Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
          Brand Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default Brands
