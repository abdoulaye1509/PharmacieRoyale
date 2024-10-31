import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLoginComponent } from './login/list-login/list-login.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path:"",component:IndexComponent},
  {path:"index",component:IndexComponent},
{path:"login",component:ListLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }