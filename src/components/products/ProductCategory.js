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
  CreateCategory,
  getallCategories,
  clearErrors
    } from '../../redux/actions/products'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Category = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const CategoriesData = useSelector(state => state.products.product_categories_data)
  const categoriesRegistrationSuccess=useSelector(state=>state.products.product_category_registration_success)
  const createCategoryError = useSelector(state => state.products.product_category_registration_error)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const [category_name, setSupplier_name] = useState("");
  const dispatch = useDispatch();
 

  const createCategory= async (e)=>{
    e.preventDefault()
    const category={
      "category_name":category_name
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateCategory(token,category))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallCategories(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/categories?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallCategories(token))
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
    if(createCategoryError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallCategories(token))
      }
      }
      users()
  },[createCategoryError]
    ); 

    useEffect(() => {
      if(categoriesRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallCategories(token))
        }
        }
        users()
    },[categoriesRegistrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Categories Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createCategory(e)}>
              <CFormGroup>
                <CLabel htmlFor="category_name">Name of category</CLabel>
                <CTooltip
                    content={`Category Name`}
                    placement={'bottom'}
                  >
                <CInput id="category_name" value={category_name} onChange={(e)=>{setSupplier_name(e.target.value)}} type="text" placeholder="Enter name of category" />
                </CTooltip>
              </CFormGroup>             
              
                <CFormGroup row>
                <CCol xs="4">
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create Category</CButton> 
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
            items={CategoriesData}
            fields={[
              { key: 'category_name', _classes: 'font-weight-bold' },
              'entry_date'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/category/${item.id}`)}
            
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={Math.ceil(CategoriesData.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in Category Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
          Category Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default Category
