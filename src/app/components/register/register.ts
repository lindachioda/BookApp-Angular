import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth-service';
import { Router, RouterLink} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit{

  userForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    //validators del form
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3), Register.isValidEmail]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Register.isValidPassword]],
  })
}

//non ho creato un oggetto di Register quindi metodo è static cosi da renderlo utilizzabile dalla classe
//metodo per validare form email
static isValidEmail(control:FormControl){
  //regexp caratteri per validare la mail se inserisco almeno uno dei caratteri richiesti
  let emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
  return emailRegexp.test(control.value) ? null : {
    isValidEmail: true
  }
}

//metodo per vvalidare form password
static isValidPassword(control: FormControl) {
    let passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    return passwordRegexp.test(control.value) ? null : {
      invalidPassword: true
    }
  }

  createUser() {

  this.authService.register(this.userForm.value).subscribe({
    next: (user) => {
      console.log('Utente creato:', user);
      this.router.navigate(['/book']);
    },
    error: (error) => {
      console.log(error);
    }
  })

}

}