import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipeService{
  recipesChanges=new Subject<Recipe[]>();
   private  recipes:Recipe[]
  //  =[
      //   new Recipe('A test Racipe',
      //             'This is the simple test',
      //             'https://1.bp.blogspot.com/-vO8IRWcxqIw/WdRyWA9q_-I/AAAAAAAAB2s/_9vcXASDI7sq3YAS_KzVQuKYIFfgyLS1ACLcBGAs/s1600/image.jpg',
      //             [
      //               new Ingredient('MEAT',1),
      //               new Ingredient('bred',2)
      //             ]),
      //   new Recipe('A  second test Racipe'
      //   ,'This is the simple test',
      //   'https://th.bing.com/th/id/R.ecbf2aabd836d8fb6921e44faafd7c65?rik=wcsAhbkycRkhUw&pid=ImgRaw&r=0',
      //   [  new Ingredient('fesh',1),
      //   new Ingredient('brchikened',2)])
      // ];
      constructor(private shoppingListService:ShoppingListService){}

    setRecipes(recipes:Recipe[]){
      this.recipes=recipes;
      this.recipesChanges.next(this.recipes.slice())
    }

    getRecipe(){
        return this.recipes
    }

    getRecipes(index:number){
      return this.recipes[index]
    }

addIngredianceToShoppingList(ingredients:Ingredient[]){
  this.shoppingListService.addIngredients(ingredients)
}
addRecipe(recipe:Recipe){
  this.recipes.push(recipe)
  this.recipesChanges.next(this.recipes.slice())
}
updateRecipe(index:number,newRecipe:Recipe){
  this.recipes[index]=newRecipe;
  this.recipesChanges.next(this.recipes.slice())
}
deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipesChanges.next(this.recipes.slice())
}
}