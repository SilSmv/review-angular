import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { add, addSuccess, findAll, findAllPageable, load, remove, removeSuccess, setErrors, setPaginator, update, updateSucess } from "./users.action";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects{

    loadUsers$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(load),
            exhaustMap( action => this.service.findAllPageable(action.page)
            .pipe(                map( pageable => {
                const users = pageable.content as User[];
                const paginator = pageable;

                setPaginator({paginator});
                return findAllPageable({users,paginator})
            }),
            catchError((error) => of(error))


            )
            )
        )
    );
    addUser$ = createEffect( () =>
        this.actions$.pipe(
            ofType(add),
            exhaustMap(action => this.service.create(action.userNew)
            .pipe(
                map(userNew => {
                    console.log("deajkfhdjkh")
                    return addSuccess({userNew})
                }), catchError( error =>error.status === 400 ? of(setErrors({userForm: action.userNew,errors: error.error})):of(error))
            )

            )
        )
    )

    addSuccessUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(addSuccess),
            tap(() => {
                this.router.navigate(['/users']);
                Swal.fire({
                    title: "Actualizado!",
                    text: "Se ha editado el elemento!",
                    icon: "success"
                });
            })

        ),{dispatch:false}
    )
    updateUser$ = createEffect( () =>
        this.actions$.pipe(
            ofType(update),
            exhaustMap(action => this.service.update(action.userUpdated)
            .pipe(
                map(userUpdated => {
                    return updateSucess({userUpdated})
                }), catchError( error =>error.status === 400 ? of(setErrors({userForm: action.userUpdated,errors: error.error})):of(error))
            )

            )
        )
    )
    updateSucessUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(updateSucess),
            tap(() => {
                this.router.navigate(['/users']);
                Swal.fire({
                    title: "Guardado!",
                    text: "Se ha guardado el elemento!",
                    icon: "success"
                  });
            })

        ),{dispatch:false}
    )
    removeUser$ = createEffect( () =>
        this.actions$.pipe(
            ofType(remove),
            exhaustMap(action => this.service.remove(action.id)
            .pipe(
                map(id => {
                    return removeSuccess({id})
                }), 
            )

            )
        )
    )
    removeSucessUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(removeSuccess),
            tap(() => {
                this.router.navigate(['/users']);
                Swal.fire({
                    title: "Eliminado!",
                    text: "Usuario eliminado con exito .",
                    icon: "success"
                  });
            })

        ),{dispatch:false}
    )
    constructor(private actions$: Actions,
        private service:UserService, private router: Router
    ){
    

    }

}