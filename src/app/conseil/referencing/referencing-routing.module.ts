import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferencingPage } from './referencing.page';

const routes: Routes = [
  {
    path: '',
    component: ReferencingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferencingPageRoutingModule {}
