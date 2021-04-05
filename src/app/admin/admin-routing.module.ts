import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
{
  path: '',
  component: AdminPage,
  children:
  [ 
  {
    path: '',
    redirectTo: 'tools',
    pathMatch: 'full',
  },
  {
    path: 'tools',
    children: [
    {
      path: '',
      loadChildren: () => import('./tools/tools.module').then( m => m.ToolsPageModule)
    }
    ]
  },
  {
    path: 'users',
    children: [
    {
      path: '',
      loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
    }
    ]
  },
  {
    path: 'categories',
    children: [
    {
      path: '',
      loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
    }
    ]
  },
  {
    path: 'projects',
    children: [
    {
      path: '',
      loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
    }
    ]
  },
  {
    path: 'statistics',
    children: [
    {
      path: '',
      loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
    }
    ]
  },
  {
    path: 'conseil',
    children: [
    {
      path: '',
      loadChildren: () => import('./conseil/conseil.module').then( m => m.ConseilPageModule)
    }
    ]
  }
  ]

}



]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
