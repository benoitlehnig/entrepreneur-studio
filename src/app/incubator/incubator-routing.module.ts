import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncubatorPage } from './incubator.page';

const routes: Routes = [
  {
    path: '',
    component: IncubatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncubatorPageRoutingModule {}
