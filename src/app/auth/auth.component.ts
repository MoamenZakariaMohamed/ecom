import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
isLoginMode=false;
isLoading=false;
error:string=null;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }
  onSubmit(form:NgForm){
   if(!form.valid){
     return;
   }
   const email=form.value.email;
   const password=form.value.password
   this.isLoading=true;

   if(this.isLoginMode){
      this.authService.login(email,password).subscribe(
        resData=>{
          console.log(resData)
          this.router.navigate(['./recipe'])
          this.isLoading=false
        },errorMessage=>{
          console.log(errorMessage)
          this.error=errorMessage
          this.isLoading=false
   
        }
      )
   }else{
   this.authService.singUp(email,password).subscribe(
     resData=>{
       console.log(resData)
       this.router.navigate(['./recipe'])
       this.isLoading=false
     },errorMessage=>{
       console.log(errorMessage)
       this.error=errorMessage
       this.isLoading=false

     }
   );
    form.reset()
  }
}
onHandelError(){
  this.error=null;
}
}
