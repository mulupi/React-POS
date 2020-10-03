import {
    SIDE_BAR
    } from './actionTypes'

export const sidebar = (data) => (dispatch) => {
    // Headers
            dispatch({
            type: SIDE_BAR,
            payload:data
            })
    };