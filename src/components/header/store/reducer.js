import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = {
    myHeaderData: null
}

const getData = (state, action) => {
    return state.set('myHeaderData', action.data)
}

const reducer = (state = defaultState, action) => {
    // let newState = Object.assign({}, state)
    switch (action.type) {
        case constants.SET_DATA:
            // newState.myHeaderData = action.data
            // return newState
            return getData(state, action)
        default:
            return state
    }
}

export default reducer