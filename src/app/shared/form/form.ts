import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Books } from '../../model/books';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Bookservice } from '../../service/bookservice';

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit{

@Input() active?: Books | null = null
@Input() books: Books[] = []
@Output() resetClick : EventEmitter<Books> = new EventEmitter
imageSrc:string = ''

constructor (private http:HttpClient, private bookService:Bookservice){}

save(form: NgForm) {
        if (this.active) {
          this.edit(form);
        } else {
          this.add (form);
        }
    }

  add(form:NgForm){
    
    //this.http.post<Books>('http://localhost:3000/books', form.value)
     console.log(form.value)
    this.bookService.addBook(form).subscribe((res)=>{
      this.books.push(res)
      form.reset()
    })
  }

  edit(form: NgForm) {
    if (!this.active) {
       return
      }
      // this.http.patch<Books>(`http://localhost:3000/books/${this.active.id}`, form. value)
      this.bookService.editBook(form, this.active).subscribe (res=>{
      //console. log('edit element')
      let index = this.books.findIndex(b => b.id === this.active?.id)
      this.books[index] = res
       })
  }

  reset(form:NgForm){
    this.active = null
    this.imageSrc = ''
    this.resetClick.emit()
    form.reset()
  }

   readUrl(event:any){
    let reader = new FileReader() 
    //fileReader consente di leggere il file in immagine!!!
    //con reader converte il file esteso base64 in formato stringa data URI
    if(event.target.files && event.target.files.length){
      let [file]= event.target.files
      reader.readAsDataURL(file)
      if(this.active) {
        reader.onload = ()=> {
          this.active!.img = reader.result as string
        } 
      } else{
      reader.onload = ()=> {
        this.imageSrc = reader.result as string
      }
    }
   }
  }

ngOnInit(): void {
}
}
