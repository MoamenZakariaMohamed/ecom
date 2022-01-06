import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipes.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, tap } from 'rxjs';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}

    storeRecipe(){
        const recipes=this.recipeService.getRecipe();
        return this.http.put('https://recipe-e1042-default-rtdb.firebaseio.com/recipes.json',recipes)
                        .subscribe(response=>{
                            console.log(response)
                        })
    } 
    fetchData(){
             return this.http.get<Recipe[]>('https://recipe-e1042-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
        map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
            })
        }),tap(
            recipes=>{
                this.recipeService.setRecipes(recipes)
            })
        )
        
    
    }
}