import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  modules: MenuItem[] = [
    {label: 'Export Settings', routerLink: '/integrations/qbd/main/configuration/export_settings'},
    {label: 'Field Mapping', routerLink: '/integrations/qbd/main/configuration/field_mapping'},
    {label: 'Advanced Settings', routerLink: '/integrations/qbd/main/configuration/advanced_settings'}
  ];

  activeModule: MenuItem;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeModule = this.modules[0];
    this.router.navigateByUrl(this.modules[0].routerLink);
  }


}
