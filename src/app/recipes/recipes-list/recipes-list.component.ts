import { Subscription } from 'rxjs';
import { Recipe } from './../recipes.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit,OnDestroy {
subscription:Subscription
recipes:Recipe[];
  
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(){
    this.subscription= this.recipeService.recipesChanges.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    )
    this.recipes=this.recipeService.getRecipe()
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }


}
