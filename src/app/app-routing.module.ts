import { AuthComponent } from './auth/auth.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { AuthGuard } from './auth/auth.gurd';

const appRoutes:Routes=[
    {path:'',redirectTo:'/recipe',pathMatch:'full'},
    {path:"recipe" ,component:RecipesComponent,canActivate:[AuthGuard] ,children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipesDetailComponent,resolve:[RecipeResolverService]},
        {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]}
    ]},
    {path:'shopping-list',component:ShoppingListComponent},
    {path:'auth',component:AuthComponent}
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{

}