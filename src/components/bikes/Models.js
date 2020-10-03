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

//material ui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import '../users/Users.css';

import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  CreateModel,
  getallModels,
  clearErrors,
  getallBrands,
  getallBodyTypes
    } from '../../redux/actions/bikes'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Models = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const BodyData = useSelector(state => state.bikes.body_types_data)
  const BrandData = useSelector(state => state.bikes.brands_data)
  const ModelsData = useSelector(state => state.bikes.models_data)
  const modelRegistrationSuccess=useSelector(state=>state.bikes.model_registration_success)
  const createModelError = useSelector(state => state.bikes.model_registration_error)

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const [model_name, setmodel_name] = useState("");
  const [file_upload, setFile] = useState(undefined);
  const [brandname, setBrandname] = useState(0);
  const [bodyname, setBodyname] = useState(0);
  const dispatch = useDispatch(); 

  const createModel= async (e)=>{
    e.preventDefault()
    const bodytype={
      "model_name":model_name,
      "brand_name":brandname,
      "body_type":bodyname,
      "file_upload":file_upload
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateModel(token,bodytype))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallModels(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/models?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallModels(token))
        await dispatch(getallBrands(token))
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
    if(createModelError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallModels(token))
      }
      }
      users()
  },[createModelError]
    ); 

    useEffect(() => {
      if(modelRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallModels(token))
        }
        }
        users()
    },[modelRegistrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Model Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createModel(e)}>

            <CFormGroup row>
                <CLabel htmlFor="model_name" col md={4}>Name of model</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Model Name`}
                    placement={'bottom'}
                  >
                <CInput id="model_name" value={model_name} onChange={(e)=>{setmodel_name(e.target.value)}} type="text" placeholder="Enter name of body" />
                </CTooltip>
                </CCol>
              </CFormGroup> 

              <CFormGroup row>
                <CLabel htmlFor="brand" col md={4}>Brand</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Select a Brand Name`}
                    placement={'bottom'}
                  >
                <Autocomplete
                    id="brand"
                    options={BrandData}
                    getOptionLabel={(option) => option.brand_name}
                    onChange={(event, newValue) => {
                      setBrandname(newValue.id);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
                  />                
                </CTooltip>
                </CCol>
              </CFormGroup> 

              <CFormGroup row>
                <CLabel htmlFor="bodytype" col md={4}>Body type</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Select a Body Name`}
                    placement={'bottom'}
                  >
                <Autocomplete
                    id="bodytype"
                    options={BodyData}
                    getOptionLabel={(option) => option.body_name}
                    onChange={(event, newValue) => {
                      setBodyname(newValue.id);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Body Type" variant="outlined" />}
                  />                
                </CTooltip>
                </CCol>
              </CFormGroup> 

              <CFormGroup row>
                  <CLabel col md={4}>Image</CLabel>
                  <CCol xs="12" md="8">
                  <CTooltip
                    content={`This is the image of the bike`}
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
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create Model</CButton> 
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
            items={ModelsData}
            fields={[
              { key: 'brand_name', _classes: 'font-weight-bold' },
              'body_type',
              'model_name',
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
            pages={Math.ceil(ModelsData.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in Model Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
        Model Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default Models
