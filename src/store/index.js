import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addressReducer } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const allReducer = combineReducers({ addressReducer })

const store = createStore(allReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store

