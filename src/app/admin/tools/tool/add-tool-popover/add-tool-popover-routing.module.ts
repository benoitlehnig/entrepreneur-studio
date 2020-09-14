import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToolPopoverPage } from './add-tool-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AddToolPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToolPopoverPageRoutingModule {}
