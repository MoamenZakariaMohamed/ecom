import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError, tap, BehaviorSubject } from "rxjs";

interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    returnSecureToken:boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{
   
    user=new BehaviorSubject<User>(null)

    constructor(private http:HttpClient, private route:Router){}

    singUp(email:string, password:string){
      return  this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrgZDBXCqqUSmX1s3aCjPhs4HBmv3y8gU',
        {
            email:email,
            password: password,
            returnSecureToken: true
        }
    ).pipe(
        catchError(this.handelError),
        tap(resData=>{
            const expirationDate=new Date(new Date().getTime() + +resData.expiresIn*1000);
            const user=new User(
                resData.email,
                resData.localId,
                resData.idToken,
                expirationDate
            )
           this.user.next(user)
        }

        ));
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrgZDBXCqqUSmX1s3aCjPhs4HBmv3y8gU',
                    {
                        email:email,
                        password:password,
                        returnSecureToken:true
                    }
                ).pipe(catchError(this.handelError),
                
                tap(resData=>{
                    const expirationDate=new Date(new Date().getTime() + +resData.expiresIn*1000);
                    const user=new User(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        expirationDate
                    )
                   this.user.next(user)
                   localStorage.setItem('userData',JSON.stringify(user))

                }
        
                ))
    }
    logOut(){
        this.user.next(null)
        this.route.navigate(['/auth']);
        localStorage.removeItem('userData')
    }
    autoLogin(){
        const userData :{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'))
        if(!userData){
            return;
        }
        const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))

        if(!loadedUser.token){
            this.user.next(loadedUser)
        }
    }
    
    // private handelAuthen(
    //     email:string,
    //     userId:string,
    //     tokin:string,
    //     expiresIn:number
    // ){
    //     const expirationDate=new Date(new Date().getTime() + expiresIn*1000); 
    //     const user= new User(email,userId,tokin,expirationDate)
    //     this.user.next(user);
    //     localStorage.setItem('userData',JSON.stringify(user))
    // }


    private handelError(errorRes:HttpErrorResponse){
        let errorMessage="An unknown error occurred !!";
            if(!errorRes.error || !errorRes.error.error ){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage="This email exists already .";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage="This email not found ."
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage='This password is not correct .'
                    break;
                
            }
            return throwError(errorMessage);
        }
    }
