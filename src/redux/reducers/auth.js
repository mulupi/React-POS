import {
    LOGIN_SUCCESS,
    ASSIGN_ROLE,
    LOGIN_FAIL,
    GET_USER_ERROR,
    CLEAR_LOGIN_ERROR,
    LOGOUT
} from '../actions/actionTypes'

const initialState = {
    access_token: null,
    refresh_token: null,
    isAuthenticated:false,
  };
const get_initialState=()=>{return initialState}
  
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
            return state
        case LOGIN_FAIL:
            return{
                ...state,
                ...get_initialState(),
                login_error:true
            }          
        case GET_USER_ERROR:
            localStorage.clear()
            return get_initialState()
        case LOGOUT:
            localStorage.clear()
            return get_initialState()
        case CLEAR_LOGIN_ERROR:
            return{
                ...state,
                login_error:false
            } 
        default:
            return state;
    }
}