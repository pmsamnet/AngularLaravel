import { Component, OnInit } from '@angular/core';
import { AuthenticationService,Post } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post:Post = {
    title:'',
    body:'',

  }
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  createPost(){
   
    this.auth.storePost(this.post).subscribe(() => {
        this.router.navigateByUrl('/posts');
    },(err) => {
      console.error(err);
    })
    
}

}
