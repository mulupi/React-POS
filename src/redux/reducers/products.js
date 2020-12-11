import {
    //products
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_ERROR,
    GET_ALL_PRODUCT,
    GET_ALL_PRODUCT_ERROR,
    //categories
    CLEAR_GET_ALL_PRODUCTS,
    CREATE_PRODUCT_CAT_SUCCESS,
    CREATE_PRODUCT_CAT_ERROR,
    GET_ALL_PRODUCT_CAT,
    GET_ALL_PRODUCT_CAT_ERROR,
    //sub categories
    CREATE_PRODUCT_SUB_CAT_SUCCESS,
    CREATE_PRODUCT_SUB_CAT_ERROR,
    GET_ALL_PRODUCT_SUB_CAT,
    GET_ALL_PRODUCT_SUB_CAT_ERROR, 

    } from '../actions/actionTypes'

const initialState = {
    //categories
    product_registration_error: false,
    product_registration_success: false,
    product_error:false,
    product_data:[],
    //categories
    product_category_registration_error: false,
    product_category_registration_success: false,
    product_categories_error:false,
    product_categories_data:[],

    //subcategories
    product_subcategory_registration_error: false,
    product_subcategory_registration_success: false,
    product_subcategory_error:false,
    product_subcategory_data:[]
  };

export default function productsReducer(state = initialState, action){
    switch(action.type)
    {
        //products
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                product_registration_success:true
            };  
        case CREATE_PRODUCT_ERROR:
            return {
                ...state,
                product_registration_error:true
            };
        case GET_ALL_PRODUCT:
            return{
                ...state,
                product_data:action.payload
            };
        case GET_ALL_PRODUCT_ERROR:
            return{
                ...state,
                product_error:true

            };
        //categories
        case CREATE_PRODUCT_CAT_SUCCESS:
            return {
                ...state,
                product_category_registration_success:true
            };  
        case CREATE_PRODUCT_CAT_ERROR:
            return {
                ...state,
                product_category_registration_error:true
            };
        case GET_ALL_PRODUCT_CAT:
            return{
                ...state,
                product_categories_data:action.payload
            };
        case GET_ALL_PRODUCT_CAT_ERROR:
            return{
                ...state,
                product_categories_error:true

            };

        //SUBcategories
        case CREATE_PRODUCT_SUB_CAT_SUCCESS:
            return {
                ...state,
                product_subcategory_registration_success:true
            };  
        case CREATE_PRODUCT_SUB_CAT_ERROR:
            return {
                ...state,
                product_subcategory_registration_error:true
            };
        case GET_ALL_PRODUCT_SUB_CAT:
            return{
                ...state,
                product_subcategory_data:action.payload
            };
        case GET_ALL_PRODUCT_SUB_CAT_ERROR:
            return{
                ...state,
                product_subcategory_error:true

            };  

        case CLEAR_GET_ALL_PRODUCTS:
            return{
                ...state,
                product_category_registration_error:false,
                product_category_registration_success:false,
                product_categories_error:false,
                product_subcategory_registration_error: false,
                product_subcategory_registration_success: false,
                product_subcategory_error:false,
                product_registration_error: false,
                product_registration_success: false,
                product_error:false,

            };
        default:
            return state;
    }
}