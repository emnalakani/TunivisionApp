import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'article-details/:id',
    loadChildren: () => import('./article-details/article-details.module').then( m => m.ArticleDetailsPageModule)
  },
  {
    path: 'magazine/:id',
    loadChildren: () => import('./magazine/magazine.module').then( m => m.MagazinePageModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./panier/panier.module').then( m => m.PanierPageModule)
  },
  {
    path: 'achat',
    loadChildren: () => import('./menu/achat/achat.module').then( m => m.AchatPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },  {
    path: 'lire-plus-tard',
    loadChildren: () => import('./menu/lire-plus-tard/lire-plus-tard.module').then( m => m.LirePlusTardPageModule)
  },
  {
    path: 'compte',
    loadChildren: () => import('./menu/compte/compte.module').then( m => m.ComptePageModule)
  },
  {
    path: 'reclamation',
    loadChildren: () => import('./menu/reclamation/reclamation.module').then( m => m.ReclamationPageModule)
  },
  {
    path: 'reclamation',
    loadChildren: () => import('./menu/reclamation/reclamation.module').then( m => m.ReclamationPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
