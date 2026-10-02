import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {

  showerrmsg: string = ''
  modelemail: string = ''
  modelpassword: string= ''

  constructor(private authService: AuthService, private router: Router) {}

  sendLogin(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          console.log('Login effettuato:', users[0]);

          // salvo utente localStorage
          localStorage.setItem('user', JSON.stringify(users[0])
          )
          this.router.navigate(['/book'])
        } else {
          this.showerrmsg = 'Email o password non corretti'
        }
      },

      error: (error) => {
        console.log(error)
        this.showerrmsg = 'Si è verificato un errore'
      }
    })
  }

  ngOnInit(): void {
    //rimuove il login precedente
    this.authService.logout()
  }
}