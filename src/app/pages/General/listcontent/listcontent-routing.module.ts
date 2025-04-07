import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcontentPage } from './listcontent.page';

const routes: Routes = [
  {
    path: '',
    component: ListcontentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListcontentPageRoutingModule {}
