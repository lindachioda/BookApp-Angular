import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Books } from '../../model/books';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Form } from '../../shared/form/form';
import { Bookservice } from '../../service/bookservice';
import { RouterLink } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-book',
  imports: [CommonModule, NgxPaginationModule, FormsModule, Form, RouterLink],
  templateUrl: './book.html',
  styleUrl: './book.scss',
})
export class Book implements OnInit{

  active?:Books | null = null //permetto anche null
  books:Books[] =[]
  error:any
  p = 1
  term:any
  search = ''
  

  constructor(private http:HttpClient, private bookService:Bookservice){}

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
  //this.http.get<Books[]>('http://localhost:3000/books')
    this.bookService.getAll().subscribe((res) => {
      this.books = res
      console.log(res)
    },
  (err: any) => {
      this.error = err
    }
  );
}

  delete(event:any, book:Books){
    event.stopPropagation()
    let index = this.books.findIndex(b => b.id === book.id)
    this.books.splice(index, 1), 
    //slice non elimina direttamente dal db

    //this.http.delete<Book>(${ApiUrl}/{book.id}) //per eliminare dal database
   (err: any) => this.error = err
  }


  setActive(book:Books){
    this.active = book
  }

  reset(){
    this.active = null
  }

  //filtra libri per input 
  //pipe filter non ompatibile con angular 21
  get filteredBooks() {
  if (!this.search.trim()) {
    return this.books
  }
  return this.books.filter(book =>
    book.title.toLowerCase().includes(this.search.toLowerCase()) ||
    book.author.toLowerCase().includes(this.search.toLowerCase())
  )
}


}
