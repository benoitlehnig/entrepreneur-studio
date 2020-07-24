import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectPage } from './project.page';

const routes: Routes = [
  {
    path: 'project',
    component: ProjectPage,
    children:
    [ {
        path: 'executive',
        children: [
          {
            path: '',
            loadChildren: './executive/executive.module#ExecutivePageModule'
          }
        ]
      },]
  },
  {
    path: 'executive',
    loadChildren: () => import('./executive/executive.module').then( m => m.ExecutivePageModule)
  },
  {
    path: '',
    redirectTo: 'project/executive',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule {}


