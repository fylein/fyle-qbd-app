import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingFieldSettingComponent } from './onboarding-field-setting.component';

describe('OnboardingFieldSettingComponent', () => {
  let component: OnboardingFieldSettingComponent;
  let fixture: ComponentFixture<OnboardingFieldSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingFieldSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingFieldSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
