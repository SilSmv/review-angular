import { createReducer, on } from "@ngrx/store";
import { CartItems } from "../models/cartItems";
import { add, remove, total } from "./items.actions";

export interface ItemsState{
    items:CartItems[],
    total:number
}


export const initalState: ItemsState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
    total:0
}
export const itemsReducer = createReducer(
    initalState,
on(add, (state,{product}) => {
    const hasItem = state.items.find((item:CartItems) => {return item.product.id === product.id})
      if(hasItem){
        return {
            items: state.items.map((item:CartItems) => {
          if(item.product.id === product.id){
            return{
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
        }),
        total: state.total}
  
      }else{
        return {
            items: [...state.items,{product:{...product},quantity:1}],
                total:state.total}
      }

}),
on(remove,(state,{id})=>{
    return {
        items: state.items.filter(item=> item.product.id !==id ),
        total: state.total
    }

}),
on(total,(state) =>{
    return {
        items: state.items,
        total: state.items.reduce((accumulator,item)=>accumulator +( item.quantity*item.product.price),0)
    }
})


)