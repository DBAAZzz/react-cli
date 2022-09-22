import store from './index'
import { SETADDRESS, CLEARADDRESS } from './actionType'

export const setAddressAc = (address) => {
    store.dispatch({
        type: SETADDRESS,
        value: address
    })
}
export const clearAddressAc = () => {
    store.dispatch({
        type: CLEARADDRESS
    })
}



