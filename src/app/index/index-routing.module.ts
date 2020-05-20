import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children:[
      {
      path:'',
      loadChildren:()=>
      import ('../welcome/welcome.module').then (
        m=> m.WelcomePageModule
      
      )
      },
      {
        path:'',
        loadChildren: () =>
        import('../signup/signup.module').then(
          m=>m.SignupPageModule
        )

      },
      {
        path:'login',
        loadChildren: () =>
        import('../login/login.module').then(
          m=>m.LoginPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
