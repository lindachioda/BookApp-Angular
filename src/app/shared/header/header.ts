import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../service/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit{

  linkMenu:any

  constructor(public authService:AuthService) {
     this.linkMenu = [{text: 'Book', url: ''}] }



  ngOnInit(): void {
  }

}
