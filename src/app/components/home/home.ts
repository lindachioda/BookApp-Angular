import {Component, OnInit} from '@angular/core';
import { Books } from '../../model/books'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Bookservice } from '../../service/bookservice';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{

   books: Books[] = []
   search = ''
 
  constructor(private bookService:Bookservice) {
  }
 
  getAll() {
    this.bookService.getAll().subscribe(res => {
        this.books = res;
        console.log(this.books)
      })
  }
 
  ngOnInit(): void {
    this.getAll()
  }

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
