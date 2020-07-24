import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExecutivePage } from './executive.page';

const routes: Routes = [
  {
    path: '',
    component: ExecutivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutivePageRoutingModule {}
