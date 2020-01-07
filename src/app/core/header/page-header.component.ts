import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  userName: string;

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.loginName.subscribe(name => {
      console.log('updating name');
      this.userName = name;
      console.log('name is now', this.userName);
    })
  }

}
