import { Dispatch } from "react";
import { IProduct, IProductFilter, ProductsAction, ProductsActionTypes } from '../../types/Product.type';
import ProductDataService from '../../api/products'

export const setItems = (items: IProduct[] | null): ProductsAction => {
    return {
        type: ProductsActionTypes.PRODUCTS_SET_ITEMS,
        payload: items
    }
}

export const setLoading = (loading: boolean): ProductsAction => {
    return {
        type: ProductsActionTypes.PRODUCTS_SET_LOADING,
        payload: loading
    }
}

export const setError = (error: string): ProductsAction => {
    return {
        type: ProductsActionTypes.PRODUCTS_SET_ERROR,
        payload: error
    }
}

export const setFilter = (filter: IProductFilter): ProductsAction => {
    return {
        type: ProductsActionTypes.PRODUCTS_SET_FILTER,
        payload: filter
    }
}

export const setCurrentPage = (page: number): ProductsAction => {
    return {
        type: ProductsActionTypes.PRODUCTS_SET_CURRENTPAGE,
        payload: page
    }
}

export const setPages = (count: number): ProductsAction => {
    return {
        type: ProductsActionTypes.PRODUCTS_SET_PAGES,
        payload: count
    }
}


export const getProducts =
    (filter: IProductFilter, currentPage: number, countOnPage: number) =>
        async (dispatch: Dispatch<ProductsAction>) => {
            dispatch(setLoading(true))
            try {
                const { products, count } = await ProductDataService.getProducts(filter, currentPage, countOnPage);
                dispatch(setItems(products))
                dispatch(setPages(count))
            } catch (error) {
                dispatch(setError('Ошибка!'))
            }
        }
