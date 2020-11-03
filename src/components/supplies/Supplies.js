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

//material ui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import '../users/Users.css';

import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  CreateSupplies,
  clearErrors,
  getallSupplies
    } from '../../redux/actions/supplies'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import jwt_decode from "jwt-decode";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const pdf=(e,Suppliesdata)=>{
  e.preventDefault()
  //pdf manenos
  const unit = "pt";
  const size = "A4";
  const orientation = "portrait";
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(15);
  const title = "Supplies Report";
  const headers = [Object.keys(Suppliesdata[0])]
  const data=Suppliesdata.map((x)=>[x.id, x.supplier, x.product, x.entry_date,x.cost_per_unit, x.price_per_unit, x.units])
  let content = {
    startY: 50,
    head: headers,
    body: data
  };
  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save("report.pdf")
}


const Supplies = () => {
  const token = useSelector(state => state.auth.access_token)
  const show = useSelector(state => state.dashboard.sidebarShow)
  const SupplierData = useSelector(state => state.suppliers.suppliers_data)
  const Suppliesdata = useSelector(state => state.supplies.supplies_data)
  const suppliesRegistrationSuccess =useSelector(state => state.supplies.supplies_registration_success)
  const createSuppliesError = useSelector(state => state.supplies.supplies_registration_error)
  const ProductsData = useSelector(state => state.products.product_data)


  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  

  const [units, setUnits] = useState(0);
  const [cost, setCost] = useState(0);
  const [price_per_unit, setPrice] = useState(0);
  const [suppliesname, setSuppliesname] = useState(0);
  const [productname,setProductname]=useState(0)
  const dispatch = useDispatch(); 

  const createSupplies= async (e)=>{
    e.preventDefault()
    const supply={
      "product":productname,
      "supplier":suppliesname,
      "units":units,
      "cost_per_unit":cost/units,
      "price_per_unit":price_per_unit
    }
      if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(CreateSupplies(token,supply))
      }
    
    if (jwt_decode(token)["role"]==="Manager"){
      await dispatch(getallSupplies(token))
    }
  }

  const showSnackBar = () => {
    setOpen(true);
  };
  const showSuccessSnackBar = () => {
    setSuccess(true);
  };
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/supplies?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallSupplies(token))
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
    if(createSuppliesError === true){
      showSnackBar()
      dispatch(clearErrors())
    }
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallSupplies(token))
      }
      }
      users()
  },[createSuppliesError]
    ); 

    useEffect(() => {
      if(suppliesRegistrationSuccess === true){
        showSuccessSnackBar()
        dispatch(clearErrors())
      }
      async function users(){
        if (jwt_decode(token)["role"]==="Manager"){
          await dispatch(getallSupplies(token))
        }
        }
        users()
    },[suppliesRegistrationSuccess]
      ); 

  return (
    <>
    <CRow >         
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Supplies Registration
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
            <CForm onSubmit={(e)=>createSupplies(e)}>

            <CFormGroup row>
                <CLabel htmlFor="brand" col md={4}>Product</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Select a Product Name`}
                    placement={'bottom'}
                  >
                <Autocomplete
                    id="brand"
                    options={ProductsData}
                    getOptionLabel={(option) => (option.product_name+" "+option.product_code)}
                    onChange={(event, newValue) => {
                      setProductname(newValue.product_code);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Product" variant="outlined" />}
                  />                
                </CTooltip>
                </CCol>
              </CFormGroup> 

              <CFormGroup row>
                <CLabel htmlFor="brand" col md={4}>Supplier</CLabel>
                <CCol xs="12" md="8">
                <CTooltip
                    content={`Select a Supplier Name`}
                    placement={'bottom'}
                  >
                <Autocomplete
                    id="brand"
                    options={SupplierData}
                    getOptionLabel={(option) => (option.id+" "+option.supplier_name)}
                    onChange={(event, newValue) => {
                      setSuppliesname(newValue.id);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Suppliers" variant="outlined" />}
                  />                
                </CTooltip>
                </CCol>
              </CFormGroup> 

              <CFormGroup>
                <CLabel htmlFor="units">Units</CLabel>
                <CTooltip
                    content={`Enter the number of units received`}
                    placement={'bottom'}
                  >
                <CInput id="units" value={units} onChange={(e)=>{setUnits(e.target.value)}} type="number" placeholder="Enter product ID" />
                </CTooltip>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="cost">Cost</CLabel>
                <CTooltip
                    content={`Enter the cost at which it was received`}
                    placement={'bottom'}
                  >
                <CInput id="cost" value={cost} onChange={(e)=>{setCost(e.target.value)}} type="number" placeholder="Enter product ID" />
                </CTooltip>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="sp">Selling price per unit</CLabel>
                <CTooltip
                    content={`Enter the Selling Price`}
                    placement={'bottom'}
                  >
                <CInput id="sp" value={price_per_unit} onChange={(e)=>{setPrice(e.target.value)}} type="number" placeholder="Enter product ID" />
                </CTooltip>
              </CFormGroup>
              
                <CFormGroup row>
                <CCol xs="5">
                <CButton  type="submit"  color="primary"><CIcon name="cil-user" /> Create Supply</CButton> 
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
            Supplies
          </CCardHeader>
          <CCardBody>
            <CDataTable
            items={Suppliesdata}
            fields={[
              { key: 'product', _classes: 'font-weight-bold' },
              'supplier',
              'units',
              'cost_per_unit',
              'entry_date',
              'price_per_unit'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/supplies/${item.id}`)}
            
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={Math.ceil(Suppliesdata.length/5)}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
        <CButton block color="dark" onClick={(e)=>pdf(e, Suppliesdata)}>Print Pdf</CButton>
      </CCol> 
   </CRow>
   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error in Supply Creation
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:"center"}}>
        <Alert onClose={handleClose} severity="success">
        Supply Created Successfully
        </Alert>
      </Snackbar>
 </>
  )
}

export default Supplies
