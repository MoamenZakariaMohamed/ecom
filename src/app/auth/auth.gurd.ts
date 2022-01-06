import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router, UrlTree } from "@angular/router";
import { Observable, map, tap, take } from 'rxjs';


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private route:Router){}
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       
        return this.authService.user.pipe(
            take(1),
            map(user=>{
          const isAuth= !!user;
            if(isAuth){
                return true;
            }
              return this.route.createUrlTree(['/auth'])
            }
        )
        )}}