import { SETADDRESS, CLEARADDRESS } from './actionType'

const addressState = {
    address: ''
}

export const addressReducer = (state = addressState, action)  => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case SETADDRESS: 
            newState.address = action.value
            return newState
        case CLEARADDRESS: 
            newState.address = ''
            return newState
        default: return newState
    }
}