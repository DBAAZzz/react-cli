import { ADD, REDUCE } from './actionType'

const defaultState = {
    count: 0
}
const listState = {
    list: [1, 2]
}
export const countReducer = (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ADD: newState.count = state.count + 1;
            return newState;
        case REDUCE: newState.count = state.count - 1;
            return newState;
        default: return newState
    }
}

export const todoListReducer = (state = listState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'realPush': 
            newState.list = [1, 2, 3]
            return newState
        default: return newState
    }
}
