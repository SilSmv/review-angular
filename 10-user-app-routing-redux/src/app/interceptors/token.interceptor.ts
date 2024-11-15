import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;
  if(token!=undefined){
    console.log('tokennnnnnnnn')
    console.log(token)
    const authReq = req.clone({
      headers: req.headers.set('Authorization',`Bearer ${token}`)}
    )
    return next(authReq);
  
  };

  return next(req);
};
