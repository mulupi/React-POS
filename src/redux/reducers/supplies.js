import {
    CREATE_SUPPLIES_SUCCESS,
    CREATE_SUPPLIES_ERROR,
    GET_ALL_SUPPLIES,
    GET_ALL_SUPPLIES_ERROR,
    CLEAR_ALL_SUPPLIES_ERROR,
} from '../actions/actionTypes'

const initialState = {
    supplies_registration_error: false,
    supplies_registration_success: false,
    get_all_supplies_error:false,
    supplies_data:[]
  };

export default function suppliesReducer(state = initialState, action){
    switch(action.type)
    {
        case CREATE_SUPPLIES_SUCCESS:
            return {
                ...state,
                supplies_registration_success:true
            };  
        case CREATE_SUPPLIES_ERROR:
            return {
                ...state,
                supplies_registration_error:true
            };
        case GET_ALL_SUPPLIES:
            return{
                ...state,
                supplies_data:action.payload
            };
        case GET_ALL_SUPPLIES_ERROR:
            return{
                ...state,
                get_all_supplies_error:true

            }
        case CLEAR_ALL_SUPPLIES_ERROR:
            return{
                ...state,
                supplies_registration_error: false,
                supplies_registration_success: false,
                get_all_supplies_error:false,

            };
        default:
            return state;
    }
}