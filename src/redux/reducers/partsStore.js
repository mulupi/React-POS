import {
    GET_ALL_PRODUCTSIN_STORE,
    GET_ALL_PRODUCTSIN_STORE_ERROR,
    CLEAR_ALL_PRODUCTSIN_STORE_ERROR,
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
        default:
            return state;
    }
}