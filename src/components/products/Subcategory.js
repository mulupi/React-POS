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
  CreateSubCategory,
  getallSubCategories,
  clearErrors
    } from '../../redux/actions/products'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const SubCategory = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const SubCategoriesData = useSelector(state => state.products.product_subcategory_data)
  const subcategoriesRegistrationSuccess=useSelector(state=>state.products.product_subcategory_registration_success)
  const createSubCategoryError = useSelector(state => state.products.product_subcategory_registration_error)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const [sub_category_name, setSub_category_name] = useState("");
  const dispatch = useDispatch();
  const createSubCategory= async (e)=>{
    e.preventDefault()
    const subcategory={
      "sub_category_name":sub_category_name
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateSubCategory(token,subcategory))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallSubCategories(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/subcategory?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallSubCategories(token))
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
    if(createSubCategoryError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallSubCategories(token))
      }
      }
      users()
  },[createSubCategoryError]
    ); 

    useEffect(() => {
      if(subcategoriesRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallSubCategories(token))
        }
        }
        users()
    },[subcategoriesRegistrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Sub-Categories Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createSubCategory(e)}>
              <CFormGroup row>
                <CLabel htmlFor="sub_category_name" col md={5}>Name of sub category</CLabel>
                <CCol xs="12" md="7">
                <CTooltip
                    content={`Sub-category Name`}
                    placement={'bottom'}
                  >
                <CInput id="sub_category_name" value={sub_category_name} onChange={(e)=>{setSub_category_name(e.target.value)}} type="text" placeholder="Enter name of sub-category" />
                </CTooltip>
                </CCol>
              </CFormGroup>        
              
                <CFormGroup row>
                <CCol xs="4">
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create Sub-Category</CButton> 
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
            Categories
          </CCardHeader>
          <CCardBody>
            <CDataTable
            items={SubCategoriesData}
            fields={[
              { key: 'title', _classes: 'font-weight-bold' },
              'entry_date'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/subcategory/${item.id}`)}
            
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={Math.ceil(SubCategoriesData.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in Sub-category Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
        Sub-category Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default SubCategory
