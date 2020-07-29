import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts:[]; 
  
  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
   this.getAllPost();
  }

  getAllPost(){

    this.auth.getAllPost().subscribe(post => {
      this.posts = post;
    },(err) => {
      console.log(err);
    })
  } 

  

}
