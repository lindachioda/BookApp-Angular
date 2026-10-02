import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Books } from '../../model/books';
import { CommonModule, Location } from '@angular/common';
import { Bookservice } from '../../service/bookservice';
import { TruncatePipe } from '../../shared/pipes/truncate-pipe';


@Component({
  selector: 'app-detail',
  imports: [CommonModule, TruncatePipe],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit{

  book!:Books 

  constructor(private http:HttpClient, private activatedRoute: ActivatedRoute, private bookService:Bookservice, private location:Location){}

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(id)
    //this.http.get<Books>(`http://localhost:3000/books/${id}`)
    this.bookService.detailBook(id).subscribe (res=> {
      this.book = res
    })
  }

  goBack(): void{
    this.location.back()
  }

}
