import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProduitComponent } from './produit/list-produit/list-produit.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { DashbordComponent } from './dashbord/dashbord.component';

const routes: Routes = [
  {path:"",component:ListProduitComponent},
{path:"produit",component:ListProduitComponent},
{path:"service",component:ListServiceComponent},
{path:"dashbord",component:DashbordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }