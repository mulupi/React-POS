import {
    CREATE_SUPPLIES_SUCCESS,
    CREATE_SUPPLIES_ERROR,
    GET_ALL_SUPPLIES,
    GET_ALL_SUPPLIES_ERROR,
    CLEAR_ALL_SUPPLIES_ERROR,
    LOGOUT
      } from './actionTypes'
  import axios from "axios";
  import{
    SUPPLIES  
  } from '../../Constants';
  export const CreateSupplies =  (access_token,data) => (dispatch) => {
      // Headers
      console.log(data)
      const formData = new FormData();
      formData.append('supplier',data["supplier"])
      formData.append('product',data["product"])
      formData.append('units',data["units"])
      formData.append('cost_per_unit',data["cost_per_unit"])
      formData.append('price_per_unit',data["price_per_unit"])
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .put(SUPPLIES, formData, config)
          .then((res) =>{
            dispatch({
              type: CREATE_SUPPLIES_SUCCESS,
              payload: res.data,
            })
          }
          )
          .catch((err) => {
            dispatch({
              type: CREATE_SUPPLIES_ERROR,
            });
          });
    };
    export const getallSupplies =  (access_token) => (dispatch) => {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token
        },
      };
        axios
          .get(SUPPLIES, config)
          .then((res) =>{
            dispatch({
              type: GET_ALL_SUPPLIES,
              payload: res.data.data,
            })
          }
          )
          .catch((err) => {
            if (err.response.status===401){
              dispatch({
                type:LOGOUT
              })
  
            }else{
            dispatch({
              type: GET_ALL_SUPPLIES_ERROR,
            });}
          });
    };
    export const clearErrors=()=>(dispatch)=>{
      dispatch({
        type: CLEAR_ALL_SUPPLIES_ERROR
      })
    }