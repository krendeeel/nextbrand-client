import { IOrder } from "./Order.type"
import { IProduct } from "./Product.type"

export interface IUser {
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean
}

export interface AuthState {
    user: IUser | null,
    isLoading: boolean
    error: string
}

export enum AuthActionTypes {
    SET_USER = 'SET_USER',
    SET_ERROR = 'SET_ERROR',
    SET_IS_LOADING = 'SET_IS_LOADING'
}

interface SetUserAction {
    type: AuthActionTypes.SET_USER,
    payload: IUser | null
}

interface SetErrorAction {
    type: AuthActionTypes.SET_ERROR,
    payload: string
}
interface SetIsLoadingAction {
    type: AuthActionTypes.SET_IS_LOADING,
    payload: boolean
}

export type registerUserData = {
    name: string,
    email: string,
    password: string
}

export type loginUserData = {
    email: string,
    password: string
}

export type updateUserData = {
    name: string,
    email: string,
    password: string
}

export type adminInfo = {
    productsCount: number,
    ordersCount: number,
    usersCount: number,
    products: IProduct[],
    orders: IOrder[]
}

export interface ResponseUser extends IUser {
    token: string
}

export type AuthAction = SetUserAction | SetErrorAction | SetIsLoadingAction;