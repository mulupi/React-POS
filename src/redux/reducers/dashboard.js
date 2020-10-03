import {
    SIDE_BAR
} from '../actions/actionTypes'

const initialState = {
    sidebarShow: false
  };

export default function dashboardReducer(state = initialState, action){
    switch(action.type)
    {
        case SIDE_BAR:
            return {
                ...state,
                sidebarShow:action.payload
            };            
        default:
            return state;
    }
}