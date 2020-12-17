import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization':`bearer ${sessionStorage.token}`})
  private url='http://localhost:8080/producto'
  constructor(private http:HttpClient) { 

  }

  getProductos():Observable<Object[]>{
    console.log(sessionStorage.token)
    return this.http.get<Object[]>(this.url+'/all',{headers:this.httpHeaders});
  }
}
