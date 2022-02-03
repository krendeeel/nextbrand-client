import { AuthAction, AuthActionTypes, AuthState } from "../../types/Auth.type"

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: ''
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_USER: {
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: ''
            }
        }

        case AuthActionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case AuthActionTypes.SET_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }

}