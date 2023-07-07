import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationFieldSettingComponent } from './configuration-field-setting.component';

describe('ConfigurationFieldSettingComponent', () => {
  let component: ConfigurationFieldSettingComponent;
  let fixture: ComponentFixture<ConfigurationFieldSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationFieldSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationFieldSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
