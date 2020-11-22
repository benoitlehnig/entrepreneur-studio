import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectPage } from './project.page';

const routes: Routes = [
{
  path: 'details',
  component: ProjectPage,
  children:
  [ {
    path: 'executive',
    children: [
    {
      path: '',
      loadChildren: () => import('./executive/executive.module').then( m => m.ExecutivePageModule)
    }
    ]
  },]
},
{
  path: '',
  redirectTo: 'details/executive',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule {}


