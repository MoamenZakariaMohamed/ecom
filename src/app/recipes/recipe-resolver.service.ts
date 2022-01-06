import { RecipeService } from './recipe.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from './recipes.model';


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStService:DataStorageService,private recipeService:RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes=this.recipeService.getRecipe()
        if(recipes.length===0){
            return this.dataStService.fetchData();
        }else{
            return recipes;
        }
    }
}