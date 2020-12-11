import {
    GET_ALL_PRODUCTSIN_STORE,
    GET_ALL_PRODUCTSIN_STORE_ERROR,
    CLEAR_ALL_PRODUCTSIN_STORE_ERROR,

    RETURN_FROM_CART
    
} from '../actions/actionTypes'

const initialState = {
    get_all_productsin_store_error:false,
    store_data:[]
  };

export default function storeProductsReducer(state = initialState, action){
    switch(action.type)
    {
        case GET_ALL_PRODUCTSIN_STORE:
            return{
                ...state,
                store_data:action.payload
            };
        case GET_ALL_PRODUCTSIN_STORE_ERROR:
            return{
                ...state,
                get_all_productsin_store_error:true

            }
        case CLEAR_ALL_PRODUCTSIN_STORE_ERROR:
            return{
                ...state,
                get_all_productsin_store_error: false
            };   
        case RETURN_FROM_CART:
            let myitems=state.store_data.filter(() => true)
            for(let x=0;x<myitems.length;x++){                
                if(myitems[x].key===action.payload.key){
                    myitems[x].remaining_units=action.payload.quantity
                    break
                }
            }; 
            return{
                ...state,
                store_data:myitems
            }    
        default:
            return state;
    }
}