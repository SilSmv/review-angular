import { createReducer,on } from "@ngrx/store";
import { increment,reset, decrement } from "./items.action";

export const initialState = 0;
export const counterReducer = createReducer(
    initialState,
    on(increment,(state,{add})=> state + add),
    on(decrement,(state)=> state-1),
    on(reset,(state)=> 0)
)