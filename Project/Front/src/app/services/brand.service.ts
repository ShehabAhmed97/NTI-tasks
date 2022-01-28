import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _http:HttpClient) { }
  getBrandById(data:any):Observable<any>{
    return this._http.get(`http://localhost:3000/brand/all/${data}`)
  }
}
