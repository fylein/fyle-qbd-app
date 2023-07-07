import { QBDScheduleFrequency } from "fyle-integrations-ui-lib";
import { QbdExportTriggerResponse, QbdAccountingExportDownload, QbdExportTriggerGet } from 'fyle-integrations-ui-lib';
import { QBDAdvancedSettingsGet } from "fyle-integrations-ui-lib";

export const getQbdAccountingExports: QbdExportTriggerResponse = {
    count: 2,
    next: null,
    previous: null,
    results: [
        {
            id: 2,
            type: "EXPORT_BILLS",
            fund_source: 'CCC',
            file_id: "fieZ6GMSmgkb",
            task_id: null,
            status: "COMPLETE",
            errors: null,
            created_at: new Date("2023-02-09"),
            updated_at: new Date("2023-02-09"),
            workspace: 1
        },
        {
            id: 1,
            type: "FETCHING_REIMBURSABLE_EXPENSES",
            fund_source: 'Reimbursable',
            file_id: null,
            task_id: null,
            status: "IN_PROGRESS",
            errors: null,
            created_at: new Date("2023-02-09T12:39:31.005110Z"),
            updated_at: new Date("2023-02-09T12:39:31.005110Z"),
            workspace: 1
        }

    ]
};

export const getQbdAccountingExports2: QbdExportTriggerResponse = {
    count: 0,
    next: null,
    previous: null,
    results: []
};


export const postQbdAccountingExports: QbdAccountingExportDownload = {
    accounting_export_id: 2,
    download_url: "fyle",
    file_id: "fieZ6GMSmgkb",
    workspace_id: 1
};

export const postQbdTriggerExportResponse: QbdExportTriggerGet = {
    message: "Trigger successful",
    new_expenses_imported: true
};

export const postQbdTriggerExportResponse2: QbdExportTriggerGet = {
    message: "Trigger successful",
    new_expenses_imported: false
};

export const errorResponse = {
    status: 404,
    statusText: "Not Found",
    error: {
      id: 1,
      is_expired: true,
      company_name: 'QBO'
    }
};

export const QBDAdvancedSettingResponse:QBDAdvancedSettingsGet = {
    id: 1,
    created_at: new Date('2023-02-01T08:42:45.803382Z'),
    updated_at: new Date('2023-02-01T08:42:45.803382Z'),
    expense_memo_structure: [
        "employee_email",
        "merchant",
        "purpose",
        "report_number",
        "expense_link"
    ],
    top_memo_structure: [
        "purpose"
    ],
    schedule_is_enabled: true,
    day_of_month: null,
    day_of_week: "MONDAY",
    frequency: QBDScheduleFrequency.WEEKLY,
    time_of_day: "12:00:00",
    emails_selected: [{name: 'shwetabh', email: "shwetabh.kumar@fylehq.com"}],
    workspace: 1,
    schedule_id: null
};

export const QBDAdvancedSettingResponse2:QBDAdvancedSettingsGet = {
    id: 1,
    created_at: new Date('2023-02-01T08:42:45.803382Z'),
    updated_at: new Date('2023-02-01T08:42:45.803382Z'),
    expense_memo_structure: [
        "employee_email",
        "merchant",
        "purpose",
        "report_number",
        "expense_link"
    ],
    top_memo_structure: [
        "purpose"
    ],
    schedule_is_enabled: true,
    day_of_month: "11",
    day_of_week: "MONDAY",
    frequency: QBDScheduleFrequency.MONTHLY,
    time_of_day: "12:00:00",
    emails_selected: [{name: 'shwetabh', email: "shwetabh.kumar@fylehq.com"}],
    workspace: 1,
    schedule_id: null
};

export const QBDAdvancedSettingResponse3:QBDAdvancedSettingsGet = {
    id: 1,
    created_at: new Date('2023-02-01T08:42:45.803382Z'),
    updated_at: new Date('2023-02-01T08:42:45.803382Z'),
    expense_memo_structure: [],
    top_memo_structure: [],
    schedule_is_enabled: true,
    day_of_month: null,
    day_of_week: null,
    frequency: QBDScheduleFrequency.DAILY,
    time_of_day: '00:00:00',
    emails_selected: [],
    workspace: 1,
    schedule_id: null
};
