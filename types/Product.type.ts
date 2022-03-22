export interface IProduct {
    _id: string,
    name: string,
    category: string,
    image: string,
    price: number,
    brand: string,
    rating: number,
    InStock: boolean,
    for: 'men' | 'women' | 'children',
    sizes?: Array<string>
    description: string
}

export interface ProductsState {
    items: IProduct[] | null,
    isLoading: boolean,
    error: string,
    filter: IProductFilter,
    currentPage: number,
    pages: number,
    countOnPage: number
}

export interface IProductFilter {
    category: string,
    sort: string,
    type: string
}

export enum ProductsActionTypes {
    PRODUCTS_SET_FILTER = 'PRODUCTS_SET_FILTER',
    PRODUCTS_SET_ITEMS = 'PRODUCTS_SET_ITEMS',
    PRODUCTS_SET_LOADING = 'PRODUCTS_SET_LOADING',
    PRODUCTS_SET_ERROR = 'PRODUCTS_SET_ERROR',
    PRODUCTS_SET_CURRENTPAGE = 'PRODUCTS_SET_CURRENTPAGE',
    PRODUCTS_SET_PAGES = 'PRODUCTS_SET_PAGES',
}


interface ProductsSetItemsAction {
    type: ProductsActionTypes.PRODUCTS_SET_ITEMS,
    payload: IProduct[] | null
}
interface ProductsSetLoadingAction {
    type: ProductsActionTypes.PRODUCTS_SET_LOADING,
    payload: boolean
}
interface ProductsSetErrorAction {
    type: ProductsActionTypes.PRODUCTS_SET_ERROR,
    payload: string
}

interface ProductsSetFilterAction {
    type: ProductsActionTypes.PRODUCTS_SET_FILTER,
    payload: IProductFilter
}

interface ProductsSetCurrentPageAction {
    type: ProductsActionTypes.PRODUCTS_SET_CURRENTPAGE,
    payload: number
}

interface ProductsSetPagesAction {
    type: ProductsActionTypes.PRODUCTS_SET_PAGES,
    payload: number
}

export type ProductsAction =
    ProductsSetItemsAction | ProductsSetLoadingAction | ProductsSetErrorAction |
    ProductsSetFilterAction | ProductsSetCurrentPageAction | ProductsSetPagesAction;

export type addProductData = {
    name: string,
    category: string,
    image: string,
    price: string,
    brand: string,
    InStock: boolean,
    for: string,
    sizes: string[],
    description: string
}    