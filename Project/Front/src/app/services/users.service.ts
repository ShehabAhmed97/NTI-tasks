import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http:HttpClient) { }

  registerUser(data:any):Observable<any>{
    return this._http.post("http://localhost:3000/user/register",data)
  }
}
