import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthen=false
  private userSub:Subscription
  constructor(private dataStService:DataStorageService,private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
       this.isAuthen=!!user
       console.log(!user)
       console.log(!!user)
    })
   
  }
 onSaveData(){
   this.dataStService.storeRecipe();
 }
 onFetchData(){
   this.dataStService.fetchData().subscribe();  
 }
 onLogOut(){
   this.authService.logOut();
   this.route.navigate(['/auth'])
 }
 
ngOnDestroy(){
  this.userSub.unsubscribe()

}
}
