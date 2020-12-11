import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    RETURN_FROM_CART
    } from './actionTypes'

export const addItemToCart = (data) => (dispatch) => {
    // Headers
            dispatch({
            type: ADD_TO_CART,
            payload:data
            })
    };
export const removeFromCart = (data,quantity) => (dispatch) => {
    // Headers
    let item={"key":data,"quantity":quantity}
            dispatch({
            type: REMOVE_FROM_CART,
            payload:data
            })
            dispatch({
                type: RETURN_FROM_CART,
                payload:item
                })
    };