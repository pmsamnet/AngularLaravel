import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



// Interfaces here
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  
}

export interface Post {
  title: string;
  body: string;
}

export interface Replay {
  post_id: number;
  parent_id?: number;
  body: string;
}


interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}



const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('mean-token')
});

const baseUrl = 'http://localhost:80/angular_workspace/AngularLaravelTest/api/api';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private token: string;

  constructor(private http:HttpClient ,  private router: Router) { }

  private request(method: 'post'|'get'|'authPost',type,user?): Observable<any>{

    let base;
    if(method=='post'){
      base = this.http.post(`${baseUrl}`+`/${type}`,user);
    }else if(method=='authPost'){
    
      base = this.http.post(`${baseUrl}`+`/${type}`,user,{headers});
    }else{
      base = this.http.get(`${baseUrl}`+`/${type}`,{headers:{Authorization:`Bearer ${this.getToken()}`}});
    }

    const request = base.pipe(map((data:TokenResponse) => {
    
      if(data['data']['token']){
        this.saveToken(data['data']['token']);
        this.saveAuth(data['data']['name']);
      }
      return data['data'];
    }))

    
    return request;


  }

  private saveAuth(name:string):void {
    localStorage.setItem('name',name);
    
  }
 

  private saveToken(token:string):void {
    localStorage.setItem('mean-token',token);
    this.token  = token;
  }

  private getToken(){
    if(!this.token){
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }


  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
     
      payload = token.split('.')[1];
      payload = window.atob(payload);
     // Object.assign(payload,{name:localStorage.getItem('name')})

     let userD = JSON.parse(payload);
     Object.assign(userD,{name:localStorage.getItem('name')})
   // console.log(userD);
    
   
    return userD;
     
    
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();

    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  
  public register(user: TokenPayload): Observable<any> {
    console.log(user);
    return this.request('post','register',user);
  }

  public storePost(post: Post): Observable<any> {
    return this.request('authPost','posts',post);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
    
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    window.localStorage.removeItem('name');

    this.router.navigateByUrl('/');
  }

  public getAllPost():Observable<any> {
    return this.request('get', 'posts');
  }


  public getPost(id:number):Observable<any> {
    return this.request('get', 'posts/'+id);
  }

  public replayComment(comment:Replay): Observable<any> {
    console.log(comment);
      return this.request('authPost','comments',comment);
  }


}
