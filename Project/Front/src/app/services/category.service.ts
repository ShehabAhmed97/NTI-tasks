import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }
  getCategoryById(data:any):Observable<any>{
    return this._http.get(`http://localhost:3000/category/all/${data}`)
  }
}
