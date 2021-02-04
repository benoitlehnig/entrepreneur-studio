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
  },
  {
    path: 'summary',
    children: [
    {
      path: '',
      loadChildren: () => import('./executive/summary/summary.module').then( m => m.SummaryPageModule)
    }
    ]
  },
  {
    path: 'timeline',
    children: [
    {
      path: '',
      loadChildren: () => import('./executive/timeline/timeline.module').then( m => m.TimelinePageModule)
    }
    ]
  },
  {
    path: 'team',
    children: [
    {
      path: '',
      loadChildren: () => import('./executive/team/team.module').then( m => m.TeamPageModule)
    }
    ]
  },
  {
    path: 'resources',
    children: [
    {
      path: '',
      loadChildren: () => import('./executive/resources/resources.module').then( m => m.ResourcesPageModule)
    }
    ]
  }
  ]
},
{
  path: '',
  redirectTo: 'details/summary',
  pathMatch: 'full'
}
,{
  path: 'summary',
  loadChildren: () => import('./executive/summary/summary.module').then( m => m.SummaryPageModule)
},
{
  path: 'timeline',
  loadChildren: () => import('./executive/timeline/timeline.module').then( m => m.TimelinePageModule)
},
{
  path: 'team',
  loadChildren: () => import('./executive/team/team.module').then( m => m.TeamPageModule)
},
{
  path: 'resources',
  loadChildren: () => import('./executive/resources/resources.module').then( m => m.ResourcesPageModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule {}


