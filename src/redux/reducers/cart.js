import {
    ADD_TO_CART,
    CLEAR_CART
} from '../actions/actionTypes'

const initialState = {
    items: []
  };

export default function addToCartReducer(state = initialState, action){
    switch(action.type)
    {
        case ADD_TO_CART:
            state["items"].push(action.payload)
            return {
                ...state,                
            };
        case CLEAR_CART:
            return initialState            
        default:
            return state;
    }
}