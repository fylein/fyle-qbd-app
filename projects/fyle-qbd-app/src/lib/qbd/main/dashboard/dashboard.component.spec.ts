import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { QbdAdvancedSettingService } from 'src/app/core/services/qbd/qbd-configuration/qbd-advanced-setting.service';
import { QbdToastService } from 'src/app/core/services/qbd/qbd-core/qbd-toast.service';
import { QbdIifLogsService } from 'src/app/core/services/qbd/qbd-iif-log/qbd-iif-logs.service';
import { DashboardComponent } from './dashboard.component';
import { errorResponse, getQbdAccountingExports, getQbdAccountingExports2, postQbdAccountingExports, postQbdTriggerExportResponse, postQbdTriggerExportResponse2, QBDAdvancedSettingResponse, QBDAdvancedSettingResponse2, QBDAdvancedSettingResponse3 } from './dashboard.fixture';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service1: any;
  let service2: any;
  let service3: any;
  let iifLogsService: QbdIifLogsService;
  let formbuilder: FormBuilder;

  beforeEach(async () => {

    service1 = {
      getQbdAccountingExports: () => of(getQbdAccountingExports),
      postQbdAccountingExports: () => of(postQbdAccountingExports),
      triggerQBDExport: () => of(postQbdTriggerExportResponse)
    };

    service2 = {
      getQbdAdvancedSettings: () => of(QBDAdvancedSettingResponse)
    };

    service3 = {
      displayToastMessage: () => undefined
    };


    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ DashboardComponent ],
      providers: [ FormBuilder,
        { provide: QbdIifLogsService, useValue: service1 },
        { provide: QbdAdvancedSettingService, useValue: service2 },
        { provide: QbdToastService, useValue: service3 }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    iifLogsService = TestBed.inject(QbdIifLogsService);
    formbuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.limit = 10;
    component.selectedDateFilter = {
      dateRange: "component Month",
      endDate: new Date(),
      startDate: new Date('Wed Feb 01 2023')
    };
    component.exportLogForm = formbuilder.group({
      dateRange: [null],
      start: [[new Date(), new Date()]],
      end: new Date()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDownloadLink function check', () => {
    expect(component.getDownloadLink(getQbdAccountingExports.results[0], 0)).toBeUndefined();
    expect(component.downloadingExportId[0]).toBeFalse();
    fixture.detectChanges();
    spyOn(iifLogsService, 'postQbdAccountingExports').and.returnValue(throwError(errorResponse));
    expect(component.getDownloadLink(getQbdAccountingExports.results[0], 0)).toBeUndefined();
    expect(component.downloadingExportId[0]).toBeFalse();
  });

  it('offsetChanges function check', () => {
    expect(component.offsetChanges(10)).toBeUndefined();
    expect(component.pageNo).toEqual(0);
    component.selectedDateFilter = null;
    fixture.detectChanges();
    expect(component.offsetChanges(10)).toBeUndefined();
    expect(component.pageNo).toEqual(0);
  });

  it('pageChanges function check', () => {
    expect(component.pageChanges(0)).toBeUndefined();
    expect(component.pageNo).toEqual(0);
    component.selectedDateFilter = null;
    fixture.detectChanges();
    expect(component.pageChanges(0)).toBeUndefined();
    expect(component.pageNo).toEqual(0);
  });

  it('dateFilterFn function check', () => {
    expect(component.dateFilter({value: component.selectedDateFilter})).toBeUndefined();
  });

  it('getTypeString function check', () => {
    expect(component.getTypeString('Export_Reimbusable_Expense')).toEqual('Reimbusable Expense');
  });

  it('getExpenseType function check', () => {
    expect(component.getExpenseType('CCC')).toEqual('Credit Card'.toUpperCase());
    expect(component.getExpenseType('Reimbusable')).toEqual('REIMBURSABLE'.toUpperCase());
  });

  it('triggerExports function check', () => {
    expect(component.triggerExports()).toBeUndefined();
    spyOn(iifLogsService, 'triggerQBDExport').and.returnValue(throwError(errorResponse));
    fixture.detectChanges();
    expect(component.triggerExports()).toBeUndefined();
  });

  it("pollExportStatus function check", fakeAsync(() => {
    spyOn(iifLogsService, 'getQbdAccountingExports').and.returnValue(of(getQbdAccountingExports2));
    const result = component.triggerExports();
    tick(3002);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(result).toBeUndefined();
      expect(component.exportInProgress).toBeFalse();
    });
    // This will stop the tick event
    discardPeriodicTasks();
    expect(component.exportInProgress).toBeFalse();
  }));

  it("pollExportStatus function check", fakeAsync(() => {
    spyOn(iifLogsService, 'getQbdAccountingExports').and.returnValue(of(getQbdAccountingExports));
    const result = component.triggerExports();
    tick(3002);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(result).toBeUndefined();
      expect(component.exportProgressPercentage).toEqual(50);
    });
    discardPeriodicTasks();
  }));

  it("pollExportStatus function check", fakeAsync(() => {
    spyOn(iifLogsService, 'getQbdAccountingExports').and.returnValue(of(getQbdAccountingExports));
    spyOn(iifLogsService, 'triggerQBDExport').and.returnValue(of(postQbdTriggerExportResponse2));
    const result = component.triggerExports();
    tick(3002);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(result).toBeUndefined();
      expect(component.exportInProgress).toBeFalse();
    });
    discardPeriodicTasks();
    expect(component.exportInProgress).toBeFalse();
  }));

  it('getDates function check', () => {
    component.exportLogForm.controls.start.patchValue([new Date(), new Date()]);
    fixture.detectChanges();
    expect(component.getDates()).toBeUndefined();
  });

  it('dropDownWatcher function check', () => {
    component.exportLogForm.controls.dateRange.patchValue(new Date().toLocaleDateString());
    fixture.detectChanges();
    expect(component.dropDownWatcher()).toBeUndefined();
    expect(component.isCalendarVisible).toBeTrue();
    component.exportLogForm.controls.dateRange.patchValue('component Week');
    fixture.detectChanges();
    expect(component.dropDownWatcher()).toBeUndefined();
    expect(component.isCalendarVisible).toBeTrue();
  });

  it('showCalendar function check', () => {
    const event = new Event("click", undefined);
    expect(component.showCalendar(event)).toBeUndefined();
    expect(component.isCalendarVisible).toBeTrue();
  });

  it('getNextExportDate function check', () => {
    expect(component.getNextExportDate(QBDAdvancedSettingResponse)).toBeUndefined();
    expect(component.getNextExportDate(QBDAdvancedSettingResponse2)).toBeUndefined();
    expect(component.getNextExportDate(QBDAdvancedSettingResponse3)).toBeUndefined();
  });
});
