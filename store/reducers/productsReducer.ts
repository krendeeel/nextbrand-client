import { ProductsAction, ProductsActionTypes, ProductsState } from "../../types/Product.type";

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: '',
    filter: {
        category: 'sport',
        sort: 'popular',
        type: 'men'
    },
    countOnPage: 6,
    currentPage: 1,
    pages: 1,
}

export const productsReducer = (state = initialState, action: ProductsAction): ProductsState => {
    switch (action.type) {
        case ProductsActionTypes.PRODUCTS_SET_ITEMS: {
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                error: ''
            }
        }
        case ProductsActionTypes.PRODUCTS_SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case ProductsActionTypes.PRODUCTS_SET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case ProductsActionTypes.PRODUCTS_SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        case ProductsActionTypes.PRODUCTS_SET_CURRENTPAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case ProductsActionTypes.PRODUCTS_SET_PAGES:
            return {
                ...state,
                pages: Math.ceil(action.payload / state.countOnPage)
            }
        default:
            return state;
    }

}