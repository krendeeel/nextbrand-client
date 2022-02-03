import { IProduct } from "./Product.type";

export interface ICartItem extends IProduct {
    size: string,
    quantity: number
}

export interface IShipping {
    fullName: string,
    address: string,
    city: string,
    postalCode: number,
    country: string
}

export interface IPayment {
    owner: string,
    cvc: string,
    number: string,
    expires: string,
}

export interface CartState {
    items: ICartItem[],
    shipping: IShipping | null,
    payment: IPayment | null,
    isLoading: boolean,
    error: string
}

export enum CartActionTypes {
    CART_ADD_ITEM = 'CART_ADD_ITEM',
    CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
    CART_CLEAR = 'CART_CLEAR',
    CART_SET_SHIPPING = 'CART_SET_SHIPPING',
    CART_SET_ITEMS = 'CART_SET_ITEMS',
    CART_SET_PAYMENT = 'CART_SET_PAYMENT',
    CART_SET_LOADING = 'CART_SET_LOADING',
    CART_SET_ERROR = ' CART_SET_ERROR',
}


interface CartAddItemAction {
    type: CartActionTypes.CART_ADD_ITEM,
    payload: ICartItem
}

interface CartRemoveItemAction {
    type: CartActionTypes.CART_REMOVE_ITEM,
    payload: ICartItem
}
interface ClearCartAction {
    type: CartActionTypes.CART_CLEAR
}

interface CartSetShippingAction {
    type: CartActionTypes.CART_SET_SHIPPING,
    payload: IShipping
}

interface CartSetItemsAction {
    type: CartActionTypes.CART_SET_ITEMS,
    payload: ICartItem[]
}
interface CartSetPaymentAction {
    type: CartActionTypes.CART_SET_PAYMENT,
    payload: IPayment
}

interface CartSetLoadingAction {
    type: CartActionTypes.CART_SET_LOADING,
    payload: boolean
}

interface CartSetErrorAction {
    type: CartActionTypes.CART_SET_ERROR,
    payload: string
}


export type CartAction =
    CartAddItemAction | CartRemoveItemAction | ClearCartAction |
    CartSetShippingAction | CartSetItemsAction | CartSetPaymentAction |
    CartSetLoadingAction | CartSetErrorAction;
