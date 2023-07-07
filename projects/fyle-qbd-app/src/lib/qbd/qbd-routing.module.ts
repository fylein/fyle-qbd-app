import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QbdComponent } from './qbd.component';

const routes: Routes = [
  {
    path: '',
    component: QbdComponent,
    children: [
      {
        path: 'onboarding',
        loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule)
      },
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QbdRoutingModule { }
