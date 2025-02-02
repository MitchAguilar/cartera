import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { costo } from '../Models/costo.model';

const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  ),
};
const HttpOptionsBody = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer "+localStorage.getItem("token")
  }),
  body: {id: "",idinmueble:"",},

};

@Injectable({
  providedIn: 'root'
})
export class CostoService {

  constructor(private http:HttpClient) { }
  //listar
  public getCostos(): Observable<any> {
    return this.http.get(`${environment.url}/costo/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar
  public getCostosInmueble(Costo: costo): Observable<any> {
    HttpOptionsBody.body.id=Costo.idinmueble;
    return this.http.get(`${environment.url}/costo/inmueble/${Costo.idinmueble}`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getCosto(Costo: costo): Observable<any> {
    HttpOptionsBody.body.id=Costo.id;
    return this.http.get(`${environment.url}/costo/${Costo.id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar
  public createCosto(Costo:costo): Observable<any> {
    return this.http
      .post(`${environment.url}/costo/`, Costo, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteCosto(Costo: costo): Observable<any> {
    HttpOptionsBody.body.id=Costo.id;
    HttpOptionsBody.body.idinmueble=Costo.idinmueble;
    return this.http
      .delete(`${environment.url}/costo/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateCosto(Costo: costo): Observable<any> {
    console.log(Costo)
    return this.http
      .put(`${environment.url}/costo/${Costo.id}`, Costo, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
    handleError(error: HttpErrorResponse) {
      let errorMessage = "Unknown error!";
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
    }
}
