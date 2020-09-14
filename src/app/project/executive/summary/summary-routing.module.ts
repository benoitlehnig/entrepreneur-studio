import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';

import { SummaryPage } from './summary.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  TooltipModule],
  exports: [RouterModule],
})
export class SummaryPageRoutingModule {}
