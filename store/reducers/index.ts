import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { cartReducer } from './cartReducer'
import { productsReducer } from './productsReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer
})

export const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        }
        if (state.count) nextState.count = state.count
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>;

export type TypeState = ReturnType<typeof reducer>;