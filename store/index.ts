import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, createStore } from "redux";
import { reducer, RootState, TypeState } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";


const makeStore: MakeStore<TypeState>
    = (context: Context) => createStore(reducer, applyMiddleware(thunk));
export const wrapper = createWrapper<TypeState>(makeStore);

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
