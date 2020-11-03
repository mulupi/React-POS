import{
    CATEGORIES,
    SUBCATEGORIES,
    PRODUCTS
} from '../../Constants'
import axios from "axios";
import {
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    GET_ALL_PRODUCT,
    GET_ALL_PRODUCT_ERROR,

    CLEAR_GET_ALL_PRODUCTS,
    CREATE_PRODUCT_CAT_SUCCESS,
    CREATE_PRODUCT_CAT_ERROR,
    GET_ALL_PRODUCT_CAT,
    GET_ALL_PRODUCT_CAT_ERROR,

    CREATE_PRODUCT_SUB_CAT_SUCCESS,
    CREATE_PRODUCT_SUB_CAT_ERROR,
    GET_ALL_PRODUCT_SUB_CAT,
    GET_ALL_PRODUCT_SUB_CAT_ERROR,

    LOGOUT
    } from './actionTypes'
export const CreateCategory =  (access_token,data) => (dispatch) => {
    // Headers
    const formData = new FormData();
    formData.append('category_name',data["category_name"])
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: "Bearer " + access_token
      },
    };
      axios
        .post(CATEGORIES, formData, config)
        .then((res) =>{
          dispatch({
            type: CREATE_PRODUCT_CAT_SUCCESS,
            payload: res.data,
          })
        }
        )
        .catch((err) => {
          dispatch({
            type: CREATE_PRODUCT_CAT_ERROR,
          });
        });
  };
export const getallCategories =  (access_token) => (dispatch) => {
// Headers
const config = {
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token
    },
};
    axios
    .get(CATEGORIES, config)
    .then((res) =>{
        dispatch({
        type: GET_ALL_PRODUCT_CAT,
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
        type: GET_ALL_PRODUCT_CAT_ERROR,
        });}
    });
};
export const CreateSubCategory =  (access_token,data) => (dispatch) => {
    // Headers
    const formData = new FormData();
    formData.append('title',data["sub_category_name"])
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: "Bearer " + access_token
      },
    };
      axios
        .post(SUBCATEGORIES, formData, config)
        .then((res) =>{
          dispatch({
            type: CREATE_PRODUCT_SUB_CAT_SUCCESS,
            payload: res.data,
          })
        }
        )
        .catch((err) => {
          dispatch({
            type: CREATE_PRODUCT_SUB_CAT_ERROR,
          });
        });
  };
export const getallSubCategories =  (access_token) => (dispatch) => {
// Headers
const config = {
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token
    },
};
    axios
    .get(SUBCATEGORIES, config)
    .then((res) =>{
        dispatch({
        type: GET_ALL_PRODUCT_SUB_CAT,
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
        type: GET_ALL_PRODUCT_SUB_CAT_ERROR,
        });}
    });
};
export const CreateProduct =  (access_token,data) => (dispatch) => {
    // Headers
    const formData = new FormData();
    formData.append('product_code',data["product_code"])
    formData.append('parts_category',data["category"])
    data["models"].map((vals)=>{
      formData.append('bike_model',vals)
    })
    
    formData.append('manufacturer',data["manufacturer"])
    formData.append('product_name',data["product_name"])
    formData.append('description',data["description"])    
    formData.append('image',data["image"])
    formData.append('subcategory',data["subcategory"])
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: "Bearer " + access_token
      },
    };
      axios
        .post(PRODUCTS, formData, config)
        .then((res) =>{
          dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data,
          })
        }
        )
        .catch((err) => {
          dispatch({
            type: CREATE_PRODUCT_ERROR,
          });
        });
  };
export const getallProducts =  (access_token) => (dispatch) => {
// Headers
const config = {
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token
    },
};
    axios
    .get(PRODUCTS, config)
    .then((res) =>{
        dispatch({
        type: GET_ALL_PRODUCT,
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
        type: GET_ALL_PRODUCT_ERROR,
        });}
    });
};
export const clearErrors=()=>(dispatch)=>{
dispatch({
    type: CLEAR_GET_ALL_PRODUCTS
})
}