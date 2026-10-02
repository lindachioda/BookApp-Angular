import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   constructor(private http:HttpClient){}

   private logged = false
   private options: HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')//da Postman

   
   //REGISTER
   register(user: User) {
  return this.http.post<User>(`${environment.apiUrl}/users`,user
  )
}

   //LOGIN
   //login(datiForm:any):Observable<string> {
    //let body = this.body(datiForm)
    //return this.http.post(`${environment.apiUrl}/auth/index.php`, body, {headers: this.options})//qui passo i paramtri
    //.pipe(map((res: any) => {
      //if(res['token']){
        //this.setSession(res['token'])
      //}
      //return res['token']//nel local storage
    //}),
     //catchError(this.errorhandler)
    //)
   //}
   login(email: string, password: string) {
  return this.http.get<User[]>(`${environment.apiUrl}/users?email=${email}&password=${password}`)
 }


   //memorizzare token a livello client nel local storage:
   //jsonwebtoken: jwt
   private setSession(jwt:string){
    //quanto tempo dura il token, 10sec
    let expire:number = new Date().getTime() + 60000 * 60
    localStorage.setItem('token', jwt)
    //scadenza token: expired
    localStorage.setItem('expired', expire.toString())
   }
   notExpired(): boolean {
       let expired = localStorage.getItem('expired')

    if (expired) {
       let expire = parseInt(expired)
        return Date.now() < expire
    }
   return false
  }

   private body(df:NgForm){
    //definisco i valori passati dal form in parametri per passarli al posto di form.value
    let param = new HttpParams().set(
      'username', df.value.username).set(
        'password', df.value.password)
      return param
   }


   //GESTIIONE ERRORI
   errorhandler(error:any){
    console.log(error)
    let msg:string
    if(error instanceof HttpErrorResponse){
      if(error.status === 0){
        msg = 'Applicazione offline'
      }else{
        msg = `Si è verificato un errore: ${error.error.msg} (server status code ${error.status})`
      }
      return throwError(msg)
    }
    return throwError(`Si è verificato un errore di tipo ${error.message}`)
   }

 
   //LOGOUT
   logout(): void {
    localStorage.removeItem('user');
  }
      

  //GUARD
  checkLogin(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // PERCORSO MENU
checkDir(): string {
  if (this.checkLogin()) {
    return '/book/';
  }
  return '';
}
}
