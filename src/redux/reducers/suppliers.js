import {
    CREATE_SUPPLIER_SUCCESS,
    CREATE_SUPPLIER_ERROR,
    GET_ALL_SUPPLIERS,
    GET_ALL_SUPPLIERS_ERROR,
    CLEAR_GET_ALL_SUPPLIERS,
} from '../actions/actionTypes'

const initialState = {
    supplier_registration_error: false,
    supplier_registration_success: false,
    get_all_suppliers_error:false,
    suppliers_data:[]
  };

export default function suppliersReducer(state = initialState, action){
    switch(action.type)
    {
        case CREATE_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplier_registration_success:true
            };  
        case CREATE_SUPPLIER_ERROR:
            return {
                ...state,
                supplier_registration_error:true
            };
        case GET_ALL_SUPPLIERS:
            return{
                ...state,
                suppliers_data:action.payload
            };
        case GET_ALL_SUPPLIERS_ERROR:
            return{
                ...state,
                get_all_suppliers_error:true

            }
        case CLEAR_GET_ALL_SUPPLIERS:
            return{
                ...state,
                supplier_registration_error: false,
                supplier_registration_success: false,
                get_all_suppliers_error:false,

            };
        default:
            return state;
    }
}