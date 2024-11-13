import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map, of, tap } from "rxjs";
import { add, addSuccess, findAll, findAllPageable, load, setErrors, setPaginator } from "./users.action";
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
            catchError(() => EMPTY)


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
                    return addSuccess({userNew})
                }), catchError( error =>error.status === 400 ? of(setErrors({errors: error.error})):EMPTY)
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
    constructor(private actions$: Actions,
        private service:UserService, private router: Router
    ){
    

    }

}