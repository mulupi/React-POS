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
            let x=false
            state["items"].map((i)=>{
                if(i.id===action.payload.id){
                    x=true
                    i.quantity_sold=parseInt(i.quantity_sold,10)+parseInt(action.payload.quantity_sold,10)
                    return{
                        ...state
                    }
                }
            })
            if(!x){
                state["items"].push(action.payload)
                return {
                    ...state,                
                };

            }
            
        case CLEAR_CART:
            return initialState            
        default:
            return state;
    }
}