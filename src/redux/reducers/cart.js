import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from '../actions/actionTypes'

const initialState = {
    items: []
  };
let new_cart=[]
export default function addToCartReducer(state = initialState, action){
    switch(action.type)
    {
        case ADD_TO_CART:
                return {
                    ...state,
                    items:action.payload
                }
        case REMOVE_FROM_CART:
            new_cart=state["items"].filter(()=>true)
            for (let i=0;i<new_cart.length;i++)
            {
                if(new_cart[i].key===parseInt(action.payload))
                {
                    new_cart.splice(i, 1)
                    break
                }
            }
            return{
                ...state,
                items:new_cart
            }
            
        case CLEAR_CART:
            return initialState            
        default:
            return state;
    }
}