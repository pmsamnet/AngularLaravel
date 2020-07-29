import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post/post-details.component';
import { CreateComponent } from './post/create.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path:'',component:LoginComponent },
  { path:'register',component:RegisterComponent},
  { path:'posts',component:PostComponent,canActivate:[AuthGuardService]},
  { path:'post-details/:id',component:PostDetailsComponent,canActivate:[AuthGuardService]},
  { path:'create-post',component:CreateComponent,canActivate:[AuthGuardService]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
