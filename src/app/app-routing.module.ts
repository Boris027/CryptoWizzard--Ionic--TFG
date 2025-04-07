import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashPage } from './shared/splash/splash.page';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthGuard2 } from './core/guards/auth2.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate:[AuthGuard2],
    loadChildren: () => import('./pages/Start/login/login.module').then( m => m.LoginPageModule)
  },
  {
    canActivate:[AuthGuard2],
    path: 'register',
    loadChildren: () => import('./pages/Start/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'splash',
    component: SplashPage
  },
  {
    path: 'search/:id',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'search',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'profile',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'list',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'cryptoview/:id/:currency',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/cryptoview/cryptoview.module').then( m => m.CryptoviewPageModule)
  },
  {
    path: 'listcontent/:id',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/listcontent/listcontent.module').then( m => m.ListcontentPageModule)
  },
  {
    path: 'about',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/General/about/about.module').then( m => m.AboutPageModule)
  },





  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
