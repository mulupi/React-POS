import {combineReducers} from 'redux'
import authReducer from './reducers/auth'
import dashboardReducer from './reducers/dashboard'
import usersReducer from './reducers/user'
import suppliersReducer from './reducers/suppliers'
import bikesReducer from './reducers/bikes'
import productsReducer from './reducers/products'
import suppliesReducer from './reducers/supplies'
import storeProductsReducer from './reducers/partsStore'
import addToCartReducer from './reducers/cart'

const allReducers=combineReducers(
    {
        auth: authReducer,
        dashboard:dashboardReducer,
        users:usersReducer,
        suppliers:suppliersReducer,
        bikes:bikesReducer,
        products:productsReducer,
        supplies:suppliesReducer,
        store:storeProductsReducer,
        cart:addToCartReducer
}
);
export default allReducers; 