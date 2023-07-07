import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationExportSettingComponent } from './configuration-export-setting.component';

describe('ConfigurationExportSettingComponent', () => {
  let component: ConfigurationExportSettingComponent;
  let fixture: ComponentFixture<ConfigurationExportSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationExportSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationExportSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
