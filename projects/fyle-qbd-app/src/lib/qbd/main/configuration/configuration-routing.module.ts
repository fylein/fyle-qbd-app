import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationAdvancedSettingComponent } from './configuration-advanced-setting/configuration-advanced-setting.component';
import { ConfigurationExportSettingComponent } from './configuration-export-setting/configuration-export-setting.component';
import { ConfigurationFieldSettingComponent } from './configuration-field-setting/configuration-field-setting.component';
import { ConfigurationComponent } from './configuration.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: 'export_settings',
        component: ConfigurationExportSettingComponent
      },
      {
        path: 'field_mapping',
        component: ConfigurationFieldSettingComponent
      },
      {
        path: 'advanced_settings',
        component: ConfigurationAdvancedSettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
