import { NgModule, } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo,customClaims } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['intl/fr']);
const redirectConseilUnauthorized = () => pipe(customClaims, map(claims => claims.conseil === true ? true : ['intl/fr'] ));

const isConseil = (next) =>  pipe(customClaims, map(claims => 
{
  if(claims.inbucator === true){
    return true;
  }
  else{
    redirectUnauthorizedTo(['intl/fr']);
    return false;
  }
})
);

const isEntrepreneur= (next) =>  pipe(customClaims, map(claims =>{
  console.log("isEntrepreneur" , claims);
  if(claims.entrepreneur === true){
    return  true;
  }
  else{
    return  false ;
  }
})
);
const isAdmin= (next) =>  pipe(customClaims, map(claims =>{
  console.log("isAdmin" , claims);
  if(claims.admin === true){
    return  true;
  }
  else{
    return  false ;
  }
})
);
const routes: Routes = [
{
  path: '',
  redirectTo: 'intl/fr',
  pathMatch: 'full'
},
{
  path: 'intl/:lang',
  loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
},
{
  path: 'entrepreneur',
  loadChildren: () => import('./entrepreneur/entrepreneur.module').then( m => m.EntrepreneurPageModule),
  canActivate: [AngularFireAuthGuard] 

},
{
  path: 'conseil',
  loadChildren: () => import('./conseil/conseil.module').then( m => m.ConseilPageModule),
  canActivate: [AngularFireAuthGuard]
},
{
  path: 'project/:id',
  loadChildren: () => import('./project/project.module').then( m => m.ProjectPageModule),
  // canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
},
{
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
},
{
  path: 'on-boarding',
  loadChildren: () => import('./on-boarding/on-boarding.module').then( m => m.OnBoardingPageModule)
},
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isAdmin }
},
{
  path: 'intl/:lang/tools',
  loadChildren: () => import('./tools/tools.module').then( m => m.ToolsPageModule)
},
{
  path: 'intl/:lang/cgu',
  loadChildren: () => import('./cgu/cgu.module').then( m => m.CguPageModule)
},
{
  path: 'intl/:lang/question',
  loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
}
];

@NgModule({
  imports: [
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
