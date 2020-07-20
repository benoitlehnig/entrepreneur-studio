import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrepreneurPage } from './entrepreneur.page';

const routes: Routes = [
  {
    path: '',
    component: EntrepreneurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrepreneurPageRoutingModule {}
