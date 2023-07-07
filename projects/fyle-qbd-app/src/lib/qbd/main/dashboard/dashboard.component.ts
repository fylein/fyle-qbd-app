import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, from, interval, switchMap, takeWhile } from 'rxjs';
import { ClickEvent, QBDAccountingExportsState, QBDAccountingExportsType, QBDScheduleFrequency, ToastSeverity } from 'fyle-integrations-ui-lib';
import { AccountingExportsResult, QbdExportTriggerResponse, QbdAccountingExportDownload, QbdExportTriggerGet } from 'fyle-integrations-ui-lib';
import { DateFilter } from 'fyle-integrations-ui-lib';
import { QbdAdvancedSettingService } from 'fyle-integrations-ui-lib';
import { QbdIifLogsService } from 'fyle-integrations-ui-lib';
import { QBDAdvancedSettingsGet } from 'fyle-integrations-ui-lib';
import { QbdToastService } from 'fyle-integrations-ui-lib';
import { TrackingService } from 'fyle-integrations-ui-lib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading: boolean = false;

  accountingExports: QbdExportTriggerResponse;

  totalCount: number;

  limit: number = 10;

  pageNo: number = 0;

  dateOptions: DateFilter[] = [
    {
      dateRange: 'This Month',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date()
    },
    {
      dateRange: 'This Week',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay()),
      endDate: new Date()
    },
    {
      dateRange: 'Today',
      startDate: new Date(),
      endDate: new Date()
    },
    {
      dateRange: new Date().toLocaleDateString(),
      startDate: new Date(),
      endDate: new Date()
    }
  ];

  selectedDateFilter: DateFilter | null = null;

  presentDate = new Date().toLocaleDateString();

  exportLogForm: FormGroup;

  isCalendarVisible: boolean = false;

  downloadingExportId: boolean[];

  exportInProgress: boolean = false;

  exportProgressPercentage: number;

  exportPresent: boolean = true;

  nextExportDate: Date | undefined;

  processedCount: number;

  isRecordPresent: boolean;

  sessionStartTime: Date = new Date();

  constructor(
    private iifLogsService: QbdIifLogsService,
    private formBuilder: FormBuilder,
    private advancedSettingService: QbdAdvancedSettingService,
    private toastService: QbdToastService,
    private trackingService: TrackingService
  ) { }

  getDates() {
    this.dateOptions[3].dateRange = this.exportLogForm.value.start[0].toLocaleDateString() + '-' + this.exportLogForm.value.start[1].toLocaleDateString();
    this.dateOptions[3].startDate = this.exportLogForm.value.start[0];
    this.dateOptions[3].endDate = this.exportLogForm.value.start[1];
    this.presentDate = this.dateOptions[3].dateRange;
    this.exportLogForm.controls.dateRange.patchValue(this.dateOptions[3]);
    const event = {
      value: this.dateOptions[3]
    };
    this.dateFilter(event);
  }

  dropDownWatcher() {
    if (this.exportLogForm.controls.dateRange.value !== this.dateOptions[3].dateRange) {
      this.isCalendarVisible = false;
    }
    this.isCalendarVisible = true;
  }

  showCalendar(event: Event) {
    event.stopPropagation();
    this.isCalendarVisible = true;
  }

  getExpenseType(type: string) {
    const expenseType = type === 'CCC' ? QBDAccountingExportsType.CREDIT_CARD : QBDAccountingExportsType.REIMBURSABLE;
    return expenseType.split("_").join(' ');
  }

  getTypeString(type: string): string {
    return type.split("_").slice(1).join(' ').split(",").join('');
  }

  dateFilter(event: any): void {
    this.isLoading = true;
    this.selectedDateFilter = event.value;
    this.iifLogsService.getQbdAccountingExports(QBDAccountingExportsState.COMPLETE, this.limit, this.pageNo, this.selectedDateFilter, [QBDAccountingExportsType.EXPORT_BILLS, QBDAccountingExportsType.EXPORT_CREDIT_CARD_PURCHASES, QBDAccountingExportsType.EXPORT_JOURNALS]).subscribe((accountingExportsResult: QbdExportTriggerResponse) => {
      this.accountingExports = accountingExportsResult;
      this.totalCount = this.accountingExports.count;
      this.isLoading = false;
    });
  }

  offsetChanges(limit: number): void {
    this.isLoading = true;
    this.limit = limit;
    this.pageNo = 0;
    this.selectedDateFilter = this.selectedDateFilter ? this.selectedDateFilter : null;
    this.iifLogsService.getQbdAccountingExports(QBDAccountingExportsState.COMPLETE, this.limit, this.pageNo, this.selectedDateFilter, [QBDAccountingExportsType.EXPORT_BILLS, QBDAccountingExportsType.EXPORT_CREDIT_CARD_PURCHASES, QBDAccountingExportsType.EXPORT_JOURNALS]).subscribe((accountingExportsResult: QbdExportTriggerResponse) => {
      this.accountingExports = accountingExportsResult;
      this.totalCount = this.accountingExports.count;
      this.isLoading = false;
    });
  }

  pageChanges(pageNo: number): void {
    this.isLoading = true;
    this.pageNo = pageNo;
    this.selectedDateFilter = this.selectedDateFilter ? this.selectedDateFilter : null;
    this.iifLogsService.getQbdAccountingExports(QBDAccountingExportsState.COMPLETE, this.limit, this.pageNo, this.selectedDateFilter, [QBDAccountingExportsType.EXPORT_BILLS, QBDAccountingExportsType.EXPORT_CREDIT_CARD_PURCHASES, QBDAccountingExportsType.EXPORT_JOURNALS]).subscribe((accountingExportsResult: QbdExportTriggerResponse) => {
      this.accountingExports = accountingExportsResult;
      this.totalCount = this.accountingExports.count;
      this.isLoading = false;
    });
  }

  exportPolling(length: number, isImportPresent: boolean): void {
    this.exportProgressPercentage = 25;
    interval(3000).pipe(
      switchMap(() => from(this.iifLogsService.getQbdAccountingExports([QBDAccountingExportsState.ENQUEUED, QBDAccountingExportsState.IN_PROGRESS, QBDAccountingExportsState.COMPLETE], this.limit, this.pageNo, null, [QBDAccountingExportsType.EXPORT_BILLS, QBDAccountingExportsType.EXPORT_CREDIT_CARD_PURCHASES, QBDAccountingExportsType.EXPORT_JOURNALS]))),
      takeWhile((response) => response.results.filter(task => (task.status === QBDAccountingExportsState.IN_PROGRESS || task.status === QBDAccountingExportsState.ENQUEUED)).length > 0, true)
    ).subscribe((res) => {
      this.processedCount = res.results.filter(task => (task.status !== QBDAccountingExportsState.IN_PROGRESS && task.status !== QBDAccountingExportsState.ENQUEUED)).length;
      this.exportProgressPercentage = Math.round((this.processedCount / length) * 100);
      if (res.results.filter(task => (task.status === QBDAccountingExportsState.IN_PROGRESS || task.status === QBDAccountingExportsState.ENQUEUED)).length === 0) {
        this.iifLogsService.getQbdAccountingExports(QBDAccountingExportsState.COMPLETE, this.limit, this.pageNo, null, [QBDAccountingExportsType.EXPORT_BILLS, QBDAccountingExportsType.EXPORT_CREDIT_CARD_PURCHASES, QBDAccountingExportsType.EXPORT_JOURNALS]).subscribe((accountingExportsResult: QbdExportTriggerResponse) => {
          this.accountingExports = accountingExportsResult;
          this.exportPresent = isImportPresent;
          this.exportInProgress = false;
        });
      }
    });
  }

  triggerExports(): void {
    this.exportInProgress = true;
    this.trackingService.onClickEvent(ClickEvent.QBD_EXPORT);
    setTimeout(() => {
      this.exportProgressPercentage = 15;
    }, 500);
    this.iifLogsService.triggerQBDExport().subscribe((triggerResponse: QbdExportTriggerGet) => {
      if (triggerResponse.new_expenses_imported) {
        this.iifLogsService.getQbdAccountingExports([QBDAccountingExportsState.ENQUEUED, QBDAccountingExportsState.IN_PROGRESS], this.limit, this.pageNo, null, null).subscribe((accountingExportsResponse: QbdExportTriggerResponse) => {
          const accountingResponseLength = accountingExportsResponse.count;
          this.exportPolling(accountingResponseLength, triggerResponse.new_expenses_imported);
        });
      } else {
        this.exportInProgress = false;
        this.exportPresent = triggerResponse.new_expenses_imported;
      }

    }, () => {
      this.exportInProgress = false;
      this.toastService.displayToastMessage(ToastSeverity.ERROR, 'Export Failed, try again later');
    });
  }

  getDownloadLink(exportData: AccountingExportsResult, index: number): void {
    this.downloadingExportId[index] = true;
    this.iifLogsService.postQbdAccountingExports(exportData.id).subscribe((postQbdAccountingExports: QbdAccountingExportDownload) => {
      const link = document.createElement('a');
      link.setAttribute('href', postQbdAccountingExports.download_url);
      link.setAttribute('download', `${postQbdAccountingExports.file_id}.iif`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      this.downloadingExportId[index] = false;
    }, () => {
      this.downloadingExportId[index] = false;
    });
  }

  getNextExportDate(advancedSettings: QBDAdvancedSettingsGet): void {
    if (advancedSettings.schedule_is_enabled) {
      const date = new Date();
      if (advancedSettings.frequency === QBDScheduleFrequency.MONTHLY) {
        let current;
        if (date.getMonth() === 11 && advancedSettings?.day_of_month) {
            current = new Date(date.getFullYear() + 1, 0, +advancedSettings?.day_of_month);
        } else if (advancedSettings?.day_of_month) {
            current = new Date(date.getFullYear(), date.getMonth() + 1, +advancedSettings?.day_of_month);
        }
        this.nextExportDate = current;
      } else if (advancedSettings.frequency === QBDScheduleFrequency.WEEKLY && advancedSettings.day_of_week) {
        const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const week = weekday.indexOf(advancedSettings.day_of_week.toLowerCase());
        const resultDate = new Date(new Date().getTime());
        resultDate.setDate(date.getDate() + ((7 + week - date.getDay()) % 7));
        this.nextExportDate = resultDate;
      } else {
        this.nextExportDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1);
      }
    }
  }

  setUpDashboard(): void {
    this.isLoading = true;
    this.exportLogForm = this.formBuilder.group({
      searchOption: [''],
      dateRange: [null],
      start: [''],
      end: ['']
    });
    forkJoin([
      this.iifLogsService.getQbdAccountingExports(QBDAccountingExportsState.COMPLETE, this.limit, this.pageNo, null, [QBDAccountingExportsType.EXPORT_BILLS, QBDAccountingExportsType.EXPORT_CREDIT_CARD_PURCHASES, QBDAccountingExportsType.EXPORT_JOURNALS]),
      this.advancedSettingService.getQbdAdvancedSettings()
    ]).subscribe((response) => {
      this.accountingExports = response[0];
      const advancedSettings = response[1];
      this.downloadingExportId =  [...Array(this.accountingExports.count).keys()].map(() => {
        return false;
      });
      this.getNextExportDate(advancedSettings);
      this.isRecordPresent = this.accountingExports.count > 0 ? true : false;
      this.totalCount = this.accountingExports.count;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.setUpDashboard();
  }

}
