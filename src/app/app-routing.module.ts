import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './app/pages/page1/page1.component';
import { Page2Component } from './app/pages/page2/page2.component';
import { FormComponent } from './app/pages/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'page1',
    component: Page1Component,
  },
  {
    path: 'page2',
    component: Page2Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
