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
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

//material ui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../users/Users.css';

import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  CreateProduct,
  getallProducts,
  clearErrors
    } from '../../redux/actions/products'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const AddProduct = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const CategoriesData = useSelector(state => state.products.product_categories_data)
  const categoriesRegistrationSuccess=useSelector(state=>state.products.product_category_registration_success)
  const createProductError = useSelector(state => state.products.product_category_registration_error)
  const ModelsData = useSelector(state => state.bikes.models_data)
  const ProductsData = useSelector(state => state.products.product_data)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  //form
  const [product_id,setProduct_id]=useState(0);
  const [manufacturer,setManufacturer]=useState("");
  const [description,setDescription]=useState("")
  const [category, setCategoryname]=useState(0)
  const [models,setModel]=useState([])

  const [product_name, setProduct_name] = useState("");
  const dispatch = useDispatch();

  const createProduct= async (e)=>{
    e.preventDefault()
    let x=models.map(vals=>vals.id)
    const product={
      "product_name":product_name,
      "product_code":product_id,
      "models":x,
      "description":description,
      "manufacturer":manufacturer,
      "category":category
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateProduct(token,product))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallProducts(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/addproduct?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallProducts(token))
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
    if(createProductError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallProducts(token))
      }
      }
      users()
  },[createProductError]
    ); 

    useEffect(() => {
      if(categoriesRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallProducts(token))
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
              Product Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createProduct(e)}>
            <CFormGroup>
                <CLabel htmlFor="product_id">Product Code</CLabel>
                <CTooltip
                    content={`Enter product code`}
                    placement={'bottom'}
                  >
                <CInput id="product_id" value={product_id} onChange={(e)=>{setProduct_id(e.target.value)}} type="number" placeholder="Enter product ID" />
                </CTooltip>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="manufacturer">Manufacturer</CLabel>
                <CTooltip
                    content={`Name of Manufacturer`}
                    placement={'bottom'}
                  >
                <CInput id="manufacturer" value={manufacturer} onChange={(e)=>{setManufacturer(e.target.value)}} type="text" placeholder="Enter name of the manufacturer" />
                </CTooltip>
              </CFormGroup>   

              <CFormGroup>
                <CLabel htmlFor="product_name">Name of Product</CLabel>
                <CTooltip
                    content={`Category Name`}
                    placement={'bottom'}
                  >
                <CInput id="product_name" value={product_name} onChange={(e)=>{setProduct_name(e.target.value)}} type="text" placeholder="Enter name of product" />
                </CTooltip>
              </CFormGroup> 

              <CFormGroup>
                <CLabel htmlFor="description">Description</CLabel>
                <CTooltip
                    content={`Enter Product Description`}
                    placement={'bottom'}
                  >
                 <CTextarea 
                      name="decription" 
                      id="description" 
                      value={description}
                      rows="4"
                      placeholder="Content..." 
                      onChange={(e)=>{setDescription(e.target.value)}}
                    />  
                </CTooltip>
              </CFormGroup> 

              <CFormGroup row>
                <CLabel htmlFor="Category" col md={4}>Category</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Select a Category`}
                    placement={'bottom'}
                  >
                <Autocomplete
                    id="Category"
                    options={CategoriesData}
                    getOptionLabel={(option) => option.category_name}
                    onChange={(event, newValue) => {
                      setCategoryname(newValue.id);
                    }}
                    renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                  />                
                </CTooltip>
                </CCol>
              </CFormGroup>             
              
              <CFormGroup row>
                <CLabel htmlFor="models" col md={4}>Models</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Select models that can use the product`}
                    placement={'bottom'}
                  >
                  <Autocomplete
                      multiple
                      id="models"
                      options={ModelsData}
                      getOptionLabel={(option) => option.model_name}
                      filterSelectedOptions
                      onChange={(event, newValue) => {
                        setModel(newValue);
                      }}
                      
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="filterSelectedOptions"
                          placeholder="Favorites"
                        />
                      )}
                    />
                      
                </CTooltip>
                </CCol>
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
            Products
          </CCardHeader>
          <CCardBody>
            <CDataTable
            items={ProductsData}
            fields={[
              { key: 'product_code', _classes: 'font-weight-bold' },
              'manufacturer',
              'product_name',
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

export default AddProduct
