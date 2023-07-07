import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingAdvancedSettingComponent } from './onboarding-advanced-setting.component';

describe('OnboardingAdvancedSettingComponent', () => {
  let component: OnboardingAdvancedSettingComponent;
  let fixture: ComponentFixture<OnboardingAdvancedSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingAdvancedSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingAdvancedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
