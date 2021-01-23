import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['intl/fr']);

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
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }

},
{
  path: 'incubator',
  loadChildren: () => import('./incubator/incubator.module').then( m => m.IncubatorPageModule)
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
  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
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
