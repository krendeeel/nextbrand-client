import {
    AuthAction,
    AuthActionTypes,
    IUser,
    loginUserData,
    updateUserData,
    registerUserData
} from "../../types/Auth.type";
import AuthDataService from '../../api/auth';
import { Dispatch } from "react";

export const setUser = (user: IUser | null): AuthAction => {
    return {
        type: AuthActionTypes.SET_USER,
        payload: user
    }
}

export const setLoading = (loading: boolean): AuthAction => {
    return {
        type: AuthActionTypes.SET_IS_LOADING,
        payload: loading
    }
}

export const setError = (error: string): AuthAction => {
    return {
        type: AuthActionTypes.SET_ERROR,
        payload: error
    }
}

export const getUser = () => async (dispatch: Dispatch<AuthAction>) => {
    dispatch(setLoading(true))
    try {
        const user = await AuthDataService.getUser();
        dispatch(setUser(user));
    } catch (error) {
        dispatch(setUser(null))
    }
}

export const loginUser = (data: loginUserData) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch(setLoading(true))
    try {
        const user = await AuthDataService.loginUser(data);
        dispatch(setUser(user))
    } catch (error) {
        dispatch(setError('Неправильный логин или пароль!'))
    }
}


export const registerUser = (data: registerUserData) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch(setLoading(true))
    try {
        const user = await AuthDataService.registerUser(data);
        dispatch(setUser(user))
    } catch (error) {
        dispatch(setError('Ошибка входа!'))
    }
}


export const updateUser = (data: updateUserData) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch(setLoading(true))
    try {
        const user = await AuthDataService.updateUser(data);
        dispatch(setUser(user))
    } catch (error) {
        dispatch(setError('Ошибка!'))
    }
}
