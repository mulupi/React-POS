import {
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    GET_ALL_USERS,
    GET_ALL_USERS_ERRORS,
    CLEAR_GET_ALL_USERS
} from '../actions/actionTypes'

const initialState = {
    user_registration_error: false,
    user_registration_success: false,
    get_all_users_error:false,
    users_data:[]
  };

export default function usersReducer(state = initialState, action){
    switch(action.type)
    {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                user_registration_success:true
            };  
        case CREATE_USER_ERROR:
            return {
                ...state,
                user_registration_error:true
            };
        case GET_ALL_USERS:
            return{
                ...state,
                users_data:action.payload
            };
        case GET_ALL_USERS_ERRORS:
            return{
                ...state,
                get_all_users_error:true

            }
        case CLEAR_GET_ALL_USERS:
            return{
                ...state,
                user_registration_success:false,
                user_registration_error:false,
                get_all_users_error:false,

            };
        default:
            return state;
    }
}