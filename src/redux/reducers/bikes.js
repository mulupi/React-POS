import {
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_ERROR,
    GET_ALL_BRANDS,
    GET_ALL_BRANDS_ERROR,

    CREATE_BODY_TYPE_SUCCESS,
    CREATE_BODY_TYPE_ERROR,
    GET_ALL_BODY_TYPES,
    GET_ALL_BODY_TYPES_ERROR,

    CREATE_MODEL_SUCCESS,
    CREATE_MODEL_ERROR,
    GET_ALL_MODELS,
    GET_ALL_MODELS_ERROR,

    CLEAR_GET_ALL_BIKES,
} from '../actions/actionTypes'

const initialState = {
    //brands
    brand_registration_error: false,
    brand_registration_success: false,
    get_all_brands_error:false,
    brands_data:[],
    //bodytypes
    body_type_registration_success:false,
    body_type_registration_error:false,
    get_all_body_types_error:false,    
    body_types_data:[],
    //models
    model_registration_success:false,
    model_registration_error:false,
    get_all_models_error:false,    
    models_data:[]
  };

export default function bikesReducer(state = initialState, action){
    switch(action.type)
    {
        //brands
        case CREATE_BRAND_SUCCESS:
            return {
                ...state,
                brand_registration_success:true
            };  
        case CREATE_BRAND_ERROR:
            return {
                ...state,
                brand_registration_error:true
            };
        case GET_ALL_BRANDS:
            return{
                ...state,
                brands_data:action.payload
            };
        case GET_ALL_BRANDS_ERROR:
            return{
                ...state,
                get_all_brands_error:true

            };

            //bodytypes
        case CREATE_BODY_TYPE_SUCCESS:
            return {
                ...state,
                body_type_registration_success:true
            }; 
        case CREATE_BODY_TYPE_ERROR:
            return {
                ...state,
                body_type_registration_error:true
            };
        case GET_ALL_BODY_TYPES:
            return{
                ...state,
                body_types_data:action.payload
            };
        case GET_ALL_BODY_TYPES_ERROR:
            return{
                ...state,
                get_all_body_types_error:true

            };


        //model
        case CREATE_MODEL_SUCCESS:
            return {
                ...state,
                model_registration_success:true
            }; 
        case CREATE_MODEL_ERROR:
            return {
                ...state,
                model_registration_error:true
            };
        case GET_ALL_MODELS:
            return{
                ...state,
                models_data:action.payload
            };
        case GET_ALL_MODELS_ERROR:
            return{
                ...state,
                get_all_models_error:true

            };            


            //clear all errors
        case CLEAR_GET_ALL_BIKES:
            return{
                ...state,
                brand_registration_error: false,
                brand_registration_success: false,
                get_all_brands_error:false,
                body_type_registration_success:false,
                body_type_registration_error:false,
                get_all_body_types_error:false,
                model_registration_success:false,
                model_registration_error:false,
                get_all_models_error:false,  

            };
        default:
            return state;
    }
}