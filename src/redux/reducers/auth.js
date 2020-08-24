import {
    LOGIN_SUCCESS,
    ASSIGN_ROLE,
    LOGIN_FAIL,
    GET_USER_ERROR,
    CLEAR_LOGIN_ERROR
} from '../actions/actionTypes'
const initialState = {
    access_token: null,
    refresh_token: null,
    isAuthenticated:false,
    id_number:null,
    user_name:null,    
    role: null,
    login_error:null,
    show:false
  };
  
export default function authReducer(state = initialState, action){
    switch(action.type)
    {
        case LOGIN_SUCCESS:
            return {
                ...state,
                access_token:action.payload.access,
                refresh_token:action.payload.refresh,
                isAuthenticated: true
            };
        case ASSIGN_ROLE:
            return {
                ...state,
                role: action.payload.Role,
                user_name:action.payload.user_name
            };
        case LOGIN_FAIL:
            return{
                ...state,
                login_error:true
            }          
        case GET_USER_ERROR:
            localStorage.clear()
        case CLEAR_LOGIN_ERROR:
            return{
                ...state,
                login_error:false
            } 

            
        default:
            return state;
    }
}