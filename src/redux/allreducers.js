import {combineReducers} from 'redux'
import authReducer from './reducers/auth'

const allReducers=combineReducers(
    {
        auth: authReducer
}
);
export default allReducers; 