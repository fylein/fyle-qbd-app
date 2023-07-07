import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FyleIntegrationsSharedModule } from 'fyle-integrations-ui-lib';

import { OnboardingRoutingModule } from './onboarding-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    FyleIntegrationsSharedModule
  ]
})
export class OnboardingModule { }
