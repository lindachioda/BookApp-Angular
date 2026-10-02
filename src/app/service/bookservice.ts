import { Injectable } from '@angular/core';
import { Books } from '../model/books';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Bookservice {

  constructor(private http:HttpClient){}

  //METODO GET
  getAll():Observable<Books[]>{
    return this.http.get<Books[]>(`${environment.apiUrl}/books`)
  }

  //METODO POST
  addBook(form: NgForm):Observable<any>{
    return this.http.post<Books>(`${environment.apiUrl}/books`, form.value)
  }

  //METODO PATCH
  editBook(form: NgForm, active:Books):Observable<any>{
    return this.http.patch<Books>(`${environment.apiUrl}/books/${active.id}`, form.value)
  }

  //METODO DETAIL GET
  detailBook(id: number):Observable<Books>{
    return this.http.get<Books>(`${environment.apiUrl}/books/${id}`)
  }

  //METODO DELETE se voglio eliminare dal db
 // deleteBook(form: NgForm):Observable<Books>{
   // return this.http.post<Books>('http://localhost:3000/books', form.value)
  //}

  

  
}
