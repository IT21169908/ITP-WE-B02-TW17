import { Dayjs } from "dayjs";
import { Range } from "react-date-range";

export interface DateRangePickerOneState {
    datePickerInternational: Date | null;
    dateRangePicker: {
        selection: Range;
    };
}

export interface CustomDateRangeState {
    startValue: Dayjs | null;
    endValue: Dayjs | null;
    endOpen: boolean;
}
