import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:8080/login';


  constructor(private http:HttpClient) { }
  loginUser({username,password}:any){
    return this.http.post<any>(this.url,{username,password})

  }
}
