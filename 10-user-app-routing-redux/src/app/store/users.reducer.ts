import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user";
import { findAll,find, setPaginator, add, update, remove, load, findAllPageable, addSuccess, setErrors } from "./users.action";
const users: User[] =[];
const user:User = new User();

export const usersReducer = createReducer(
    {
        users,
        paginator:{},
        user,
        erros:{}
    },
    on(findAll,(state,{users}) => ({
            users: [...users],
            paginator: state.paginator,
            user: state.user,
            erros: state.erros
    }
    )), 
    on(findAllPageable,(state,{users, paginator}) => ({
        users: [...users],
        paginator: {...paginator},
        user: state.user,
        erros: state.erros
}
)), 
    on(find, (state,{id}) => ({
        users: state.users,
        paginator: state.paginator,
        user: state.users.find(user => id === user.id) || new User(),
        erros: state.erros
    })),
    on(setPaginator,(state,{paginator})=>({
        users: state.users,
        paginator: {...paginator},
        user: state.user,
        erros: state.erros

    })), 
    on(add,(state,{userNew}) =>({
        users: [...state.users,{...userNew}],
        paginator: state.paginator,
        user: state.user,
        erros: state.erros
    })),
    on(addSuccess,(state,{userNew}) =>({
        users: [...state.users,{...userNew}],
        paginator: state.paginator,
        user: state.user,
        erros: state.erros
    })),
    on(update,(state,{userUpdated})=>({
        users:state.users.map(u => (u.id == userUpdated.id)? {...userUpdated}:u),
        paginator: state.paginator,
        user: state.user,
        erros: state.erros

    })),
    on(remove, (state,{id}) => ({
        users: state.users.filter(user => user.id != id),
        paginator: state.paginator,
        user: state.user,
        erros: state.erros
    })),
    on(setErrors, (state,{errors}) => ({
        users: state.users,
        paginator: state.paginator,
        user: state.user,
        erros: {...errors}
    })),
)