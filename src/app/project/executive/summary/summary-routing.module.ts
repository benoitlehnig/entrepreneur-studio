import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';

import { SummaryPage } from './summary.page';
  import { AutoCompleteModule } from 'ionic4-auto-complete';

const routes: Routes = [
  {
    path: '',
    component: SummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  TooltipModule,
  AutoCompleteModule],
  exports: [RouterModule,AutoCompleteModule ],
})
export class SummaryPageRoutingModule {}
