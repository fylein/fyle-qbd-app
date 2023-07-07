import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAdvancedSettingComponent } from './configuration-advanced-setting.component';

describe('ConfigurationAdvancedSettingComponent', () => {
  let component: ConfigurationAdvancedSettingComponent;
  let fixture: ComponentFixture<ConfigurationAdvancedSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationAdvancedSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationAdvancedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
