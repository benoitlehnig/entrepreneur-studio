import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectPage } from './project.page';

const routes: Routes = [
{
  path: ':id',
  component: ProjectPage,
  children:
  [ 
  {
    path: "",
    redirectTo: "summary",
    pathMatch: "full"
  },
  {
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
  },
  {
    path: 'settings',
    children: [
    {
      path: '',
      loadChildren: () => import('./executive/settings/settings.module').then( m => m.SettingsPageModule)
    }
    ]
  },
  {
    path: 'drive',
    children: [
    {
      path: '',
      loadChildren: () => import('./executive/drive/drive.module').then( m => m.DrivePageModule)
    }
    ]
  }
  ]
},
{
  path: ':id/',
  redirectTo: ':id/summary',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectPageRoutingModule {}


