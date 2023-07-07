import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FyleIntegrationsSharedModule } from 'fyle-integrations-ui-lib';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FyleIntegrationsSharedModule,
    TooltipModule
  ]
})
export class DashboardModule { }
