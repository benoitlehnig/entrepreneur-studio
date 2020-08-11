import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExecutivePage } from './executive.page';

const routes: Routes = [
{
  path: 'executive',
  component: ExecutivePage,
  children: [
  {
    path: 'summary',
    children: [
    {
      path: '',
      loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
    }
    ]
  },
  ]
},
{
  path: '',
  redirectTo: 'executive/summary',
  pathMatch: 'full',
},{
  path: 'summary',
  loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutivePageRoutingModule {}
