import { createStore, combineReducers, applyMiddleware } from 'redux';
import { countReducer, todoListReducer } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const allReducer = combineReducers({ countReducer, todoListReducer })

const store = createStore(allReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store

