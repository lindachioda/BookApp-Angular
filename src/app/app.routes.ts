import { Routes } from '@angular/router';
import { Detail } from './features/detail/detail';
import { Book } from './components/book/book';
import { loginGuard } from './shared/guards/login-guard';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'logout', redirectTo: 'login', pathMatch: 'full'},
    {path: 'book', component: Book, canActivate: [loginGuard]},
    {path: 'book/:id', component: Detail}
];
