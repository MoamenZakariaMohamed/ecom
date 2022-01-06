import { Subject } from "rxjs"
import { Ingredient } from "../shared/ingredient.model"

export class ShoppingListService{
ingredientsChanges=new Subject<Ingredient[]>();
startedEditing=new Subject<number>();
    ingredients :Ingredient[]=[
        new Ingredient('apple',5),
        new Ingredient('Mango',10),
      ];

      getIngrediant(){
          return this.ingredients.slice()
      }
      getIngredients(index:number){
        return this.ingredients[index]
      }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChanges.next(this.ingredients.slice())
    }
    addIngredients(ingredent:Ingredient[]){
        this.ingredients.push(...ingredent);
        this.ingredientsChanges.next(this.ingredients.slice())
    }
    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanges.next(this.ingredients.slice());
      }
    deleteIngrediant(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanges.next(this.ingredients.slice())
    }
}