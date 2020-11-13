import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,
  CForm,
  CInput,
  CButton,
  CFormGroup

} from '@coreui/react'

import '../users/Users.css';

import { 
  useSelector,
  useDispatch
 } from 'react-redux'
import {
  getallProductsinStore
    } from '../../redux/actions/partsStore'
import {addItemToCart} from '../../redux/actions/cart'
import jwt_decode from "jwt-decode";
import {URL} from '../../Constants'
import Modal from '@material-ui/core/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

//cards
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme)=>({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
    media: {
      height: 200,
    },
    card:{
        marginBottom:20,
    }
  }));

const Category = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.access_token)
  const store_products = useSelector(state => state.store.store_data)
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [data, setSelected] = React.useState(undefined);
  const [quantinty, setQuantity] = React.useState(0);
  

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const handleOpen = (e, i) => {
    e.preventDefault()
    setSelected(i)
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])
  useEffect(()=>{
    async function users(){
      if (jwt_decode(token)["role"]==="Manager"){
        await dispatch(getallProductsinStore(token))
      }
    }
    users()
  },[])

  const addToCart= async (e)=>{
    e.preventDefault()
    data["id"]=data["product_code"]
    data["quantity_sold"]=quantinty
    await dispatch(addItemToCart(data))
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Quantity</h2>
      <p id="simple-modal-description">
      <CForm onSubmit={(e)=>addToCart(e)}>
      <CFormGroup row>
          <CCol xs="6">
            <CInput id="Quantity" value={quantinty} onChange={(e)=>{setQuantity(e.target.value)}} type="number"/>
          </CCol>
          <CCol xs="6">
            <CButton  type="submit"  color="primary"><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</CButton>
          </CCol>
      </CFormGroup>
      </CForm>
      </p>
    </div>
  );
  const salesProd=(prods)=>(
      
      prods.map((i)=>(          
        <CCol xs="12" sm="6" md="4">
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
            className={classes.media}
              image={URL+i.image}   
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {i.product_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {i.product_description}
              </Typography>
              <Typography variant="body1" component="h6">
               Price: {i.Price_per_unit}
              </Typography>
              <Typography variant="body1" color="error" component="h6">
               Units Remaining: {i.remaining_units}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={(e)=>{handleOpen(e,i)}}>
              Add to cart
            </Button>
          </CardActions>
        </Card>
        </CCol>
          
      ))
  )

  return (
    <>
    <CRow>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    {salesProd(store_products)}

    </CRow>
    
 </>
  )
}

export default Category
