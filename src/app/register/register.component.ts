import { Component, OnInit } from '@angular/core';
import { AuthenticationService,TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  credential:TokenPayload = {
    email:'',
    name:'',
    password:''
  }
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register(){
   
      this.auth.register(this.credential).subscribe(() => {
          this.router.navigateByUrl('/posts');
      },(err) => {
        console.error(err);
      })
      
  }



}
