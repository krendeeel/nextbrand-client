import { CartAction, CartActionTypes, CartState } from "../../types/Cart.type";

const initialState: CartState = {
    items: [],
    shipping: null,
    payment: null,
    isLoading: false,
    error: ''
}

export const cartReducer = (state = initialState, action: CartAction): CartState => {
    switch (action.type) {
        case CartActionTypes.CART_ADD_ITEM: {
            const newItem = action.payload;
            const existItem = state.items.find(item => item._id === newItem._id)
            const cartItems = existItem ? state.items.map(item => item.name === existItem.name ? newItem : item)
                : [...state.items, newItem];
            localStorage.setItem('items', JSON.stringify(cartItems));
            return { ...state, items: cartItems }
        }

        case CartActionTypes.CART_REMOVE_ITEM: {
            const cartItems = state.items.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('items', JSON.stringify(cartItems));
            return { ...state, items: cartItems }
        }
        case CartActionTypes.CART_SET_SHIPPING: {
            return {
                ...state,
                shipping: action.payload
            }
        }
        case CartActionTypes.CART_SET_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case CartActionTypes.CART_SET_PAYMENT:
            return {
                ...state,
                payment: action.payload
            }
        case CartActionTypes.CART_CLEAR:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}