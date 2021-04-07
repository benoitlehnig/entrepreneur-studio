import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConseilsPage } from './conseils.page';

const routes: Routes = [
  {
    path: '',
    component: ConseilsPage
  },
  {
    path: 'conseil',
    loadChildren: () => import('./conseil/conseil.module').then( m => m.ConseilPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConseilsPageRoutingModule {}
