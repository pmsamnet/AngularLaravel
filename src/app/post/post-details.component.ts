import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails,Replay } from '../services/authentication.service';
import { ActivatedRoute,Router } from '@angular/router';


// Interfaces here
export class PostDetails {
  id: number;
  title:string;
  body: string;
  comments:Comment[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class Comment {
  body: String;
  created_at: Date;
  deleted_at: Date;
  id: String;
  parent_id: number;
  post_id: number;
  updated_at: Date;
  user_id: number;
  user:UserDetails;
  replies:Comment[];
}

export class Replies {
  body: String;
  created_at: Date;
  deleted_at: Date;
  id: String;
  parent_id: number;
  post_id: number;
  updated_at: Date;
  user_id: number;
  user:UserDetails;
}


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public id: any;

  postdetails:PostDetails;

  replayPostComment :Replay= {
    body:'',
    post_id:null
  }
 

  constructor(private auth:AuthenticationService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.replayPostComment.post_id = this.id;
    
    this.GetPostDetail(this.id);
   
  }

  GetPostDetail(id){
    this.auth.getPost(id).subscribe(post => {
     
      this.postdetails = post;
     
    },(err)=>{
      console.log(err);
    })
  }


  replayPost(){
    console.log('enter');
  /*
    this.auth.replayComment(this.replayPostComment).subscribe(()=> {

    },(err) => {
      console.error(err);
    })
    */
  }
  test(){
    this.auth.replayComment(this.replayPostComment).subscribe(()=> {
      this.GetPostDetail(this.id);
      this.replayPostComment.body='';
      this.router.navigate(['/post-details',this.id]);
    },(err) => {
      console.error(err);
    })
    
  }
 
}
