import {
    ADD_TO_CART
    } from './actionTypes'

export const addItemToCart = (data) => (dispatch) => {
    // Headers
            dispatch({
            type: ADD_TO_CART,
            payload:data
            })
    };