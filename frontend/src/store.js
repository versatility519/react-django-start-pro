import {createStore, applyMiddleware} from 'redux'; //createStore => to create store(the single source of truth)
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //the middleware to make asynchronous request from our actions
import rootReducer from './reducers';  //this is going to look for index.js inside folder called reducers

//our store will have initial state
const initialState = {};

//our middleware ; to make asynchronous request to the server
const middleware = [thunk];

//we now create our store which takes in rootReducer, initialState , and any middle we want using the devtools-extension
const store = createStore(
        rootReducer , 
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

