import { Dispatch } from "react";
import {
    CartAction, CartActionTypes, ICartItem, IPayment, IShipping
} from "../../types/Cart.type";


export const cartAddItem = (item: ICartItem): CartAction => {
    return {
        type: CartActionTypes.CART_ADD_ITEM,
        payload: item
    }
}

export const cartRemoveItem = (item: ICartItem): CartAction => {
    return {
        type: CartActionTypes.CART_REMOVE_ITEM,
        payload: item
    }
}

export const cartSetItems = (items: ICartItem[]): CartAction => {
    return {
        type: CartActionTypes.CART_SET_ITEMS,
        payload: items
    }
}

export const cartSetShipping = (shipping: IShipping): CartAction => {
    return {
        type: CartActionTypes.CART_SET_SHIPPING,
        payload: shipping
    }
}

export const cartSetPayment = (payment: IPayment): CartAction => {
    return {
        type: CartActionTypes.CART_SET_PAYMENT,
        payload: payment
    }
}

export const clearCart = (): CartAction => {
    return {
        type: CartActionTypes.CART_CLEAR,
    }
}

export const cartSetLoading = (loading: boolean): CartAction => {
    return {
        type: CartActionTypes.CART_SET_LOADING,
        payload: loading
    }
}

export const cartSetError = (error: string): CartAction => {
    return {
        type: CartActionTypes.CART_SET_ERROR,
        payload: error
    }
}


