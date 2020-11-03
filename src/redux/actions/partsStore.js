import {
    GET_ALL_PRODUCTSIN_STORE,
    GET_ALL_PRODUCTSIN_STORE_ERROR,
    CLEAR_ALL_PRODUCTSIN_STORE_ERROR,
    LOGOUT
      } from './actionTypes'
import{
    PARTS_STORE  
        } from '../../Constants';
import axios from "axios";
export const getallProductsinStore =  (access_token) => (dispatch) => {
    // Headers
    const config = {
        headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token
        },
    };
        axios
        .get(PARTS_STORE, config)
        .then((res) =>{
            dispatch({
            type: GET_ALL_PRODUCTSIN_STORE,
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
            type: GET_ALL_PRODUCTSIN_STORE_ERROR,
            });}
        });
    };
    export const clearErrors=()=>(dispatch)=>{
    dispatch({
        type: CLEAR_ALL_PRODUCTSIN_STORE_ERROR
    })
    }