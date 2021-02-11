import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
{
  path: '',
  component: AdminPage,
  children:
  [ {
    path: 'tools',
    children: [
    {
      path: '',
      loadChildren: () => import('./tools/tools.module').then( m => m.ToolsPageModule)
    },
    ]},
    {
      path: 'users',
      children: [
      {
        path: '',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      }
      ]
   
  }
  ]
}];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminPageRoutingModule {}
