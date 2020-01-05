import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private router: Router,
    public loginService: LoginService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('login submit clicked', form.value);
    this.loginService.loginName.next(form.value.username);
    // sessionStorage.setItem('username', form.value.username);
    this.router.navigate(['/members']);
  }
}
