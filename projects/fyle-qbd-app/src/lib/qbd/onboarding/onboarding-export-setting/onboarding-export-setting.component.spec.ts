import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingExportSettingComponent } from './onboarding-export-setting.component';

describe('OnboardingExportSettingComponent', () => {
  let component: OnboardingExportSettingComponent;
  let fixture: ComponentFixture<OnboardingExportSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingExportSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingExportSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
