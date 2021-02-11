import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsPage } from './tools.page';

const routes: Routes = [
  {
    path: '',
    component: ToolsPage
  },
  {
    path: 'add-tool-popover',
    loadChildren: () => import('./tool/add-tool-popover/add-tool-popover.module').then( m => m.AddToolPopoverPageModule)
  },
  {
    path: 'tool',
    loadChildren: () => import('./tool/tool.module').then( m => m.ToolPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsPageRoutingModule {}
