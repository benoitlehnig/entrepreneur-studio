import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConseilPage } from './conseil.page';

const routes: Routes = [
  {
    path: '',
    component: ConseilPage
  },  {
    path: 'referencing',
    loadChildren: () => import('./referencing/referencing.module').then( m => m.ReferencingPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConseilPageRoutingModule {}
