import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerPage } from './pages/container';
import { WidgetPage } from './pages/widget';
import { NoContentPage } from './pages/no-content.page';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/container', pathMatch: 'full' },
  { path: 'container', component: ContainerPage },
  { path: 'widget', component: WidgetPage },
  { path: '**', component: NoContentPage }
];

@NgModule({
  imports: [
      RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
