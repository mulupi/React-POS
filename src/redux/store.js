import allReducers from './allreducers'
import {createStore,
  applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

function saveTolocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch (e) {
    }
  }
  
function loadFromlocalStorage() {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  }

const middleware = [thunk];

const persistedState = loadFromlocalStorage();
const store=createStore(
    allReducers,
    persistedState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

store.subscribe(() => saveTolocalStorage(store.getState()));
export default store