import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExecutivePage } from './executive.page';

const routes: Routes = [
{
  path: 'tabs',
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
  {
    path: 'team',
    children: [
    {
      path: '',
       loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule)
    }
    ]
  },
  {
    path: 'summary',
    children: [
    {
      path: '',
      loadChildren: () => import('./achievements/achievements.module').then( m => m.AchievementsPageModule)
    }
    ]
  },
  {
    path: 'resources',
    children: [
    {
      path: '',
      loadChildren: () => import('./resources/resources.module').then( m => m.ResourcesPageModule)
    }
    ]
  },
  {
    path: 'timeline',
    children: [
    {
      path: '',
    loadChildren: () => import('./timeline/timeline.module').then( m => m.TimelinePageModule)
    }
    ]
  },
  
  
  ]
},
{
  path: '',
  redirectTo: 'tabs/summary',
  pathMatch: 'full',
},{
  path: 'summary',
  loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
},
{
  path: 'team',
  loadChildren: () => import('./team/team.module').then( m => m.TeamPageModule)
},
{
  path: 'achievements',
  loadChildren: () => import('./achievements/achievements.module').then( m => m.AchievementsPageModule)
},
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources.module').then( m => m.ResourcesPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./timeline/timeline.module').then( m => m.TimelinePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutivePageRoutingModule {}
