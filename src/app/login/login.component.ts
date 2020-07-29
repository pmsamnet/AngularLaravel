import { Component, OnInit } from '@angular/core';
import { AuthenticationService,TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credential:TokenPayload = {
    email:'',
    password:''
  }
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credential).subscribe(() => {
      this.router.navigateByUrl('/posts');
    }, (err) => {
      console.error(err);
    });
  }

}
