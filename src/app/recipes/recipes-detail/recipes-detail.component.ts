import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipes.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
 recipe:Recipe;
  id:number;
  constructor( private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipes(this.id)
      }
    )
  }
  onAddToShoppingList(){
    this.recipeService.addIngredianceToShoppingList(this.recipe.ingredients)
  }
  onClicked(){
    this.router.navigate(['edit'],{relativeTo:this.route})
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipe'])
  }

}
