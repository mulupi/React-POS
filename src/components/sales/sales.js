import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,

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

//cards
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    media: {
      height: 200,
    },
    card:{
        marginBottom:20,
    }
  });

const Category = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
  const token = useSelector(state => state.auth.access_token)
  const store_products = useSelector(state => state.store.store_data)
  

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

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

  const addToCart= async (e,data)=>{
    e.preventDefault()
    data["id"]=data["product_code"]    
    await dispatch(addItemToCart(data))
  }


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
            <Button size="small" color="primary" onClick={(e)=>{addToCart(e,i)}}>
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
    {salesProd(store_products)}

    </CRow>
    
 </>
  )
}

export default Category
