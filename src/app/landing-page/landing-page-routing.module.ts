import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';

import { LandingPagePage } from './landing-page.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPagePage
  },  {
    path: 'conseil',
    loadChildren: () => import('./conseil/conseil.module').then( m => m.ConseilPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[ScreenTrackingService]
})
export class LandingPagePageRoutingModule {}
