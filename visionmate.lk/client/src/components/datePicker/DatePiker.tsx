import { DatePicker } from 'antd';
import { addDays } from 'date-fns';
import React, { useState } from 'react';
import { DateRangePicker, Range } from "react-date-range";
import { CustomDateRangeState, DateRangePickerOneState } from "../../types/date-picker-types";
import { Button } from "../buttons/Button";
import { Dayjs } from 'dayjs';
import { ButtonGroup, ItemWrapper } from './styled-elements';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DateRangePickerOne(): JSX.Element {
    const [state, setState] = useState<DateRangePickerOneState>({
        datePickerInternational: null,
        dateRangePicker: {
            selection: {
                startDate: new Date(),
                endDate: addDays(new Date(), 7),
                key: 'selection',
            },
        },
    });

    const handleRangeChange = (which: Range): void => {
        setState({
            ...state,
            dateRangePicker: {
                ...state.dateRangePicker,
                ...which,
            },
        });
    };

    const { dateRangePicker } = state;
    let start: string[] = [];
    let end: string[] = [];

    if (dateRangePicker && dateRangePicker.selection && dateRangePicker.selection.startDate && dateRangePicker.selection.endDate) {
        start = dateRangePicker.selection.startDate.toString().split(' ');
        end = dateRangePicker.selection.endDate.toString().split(' ');
    }

    return (
        <ItemWrapper>
            <DateRangePicker
                onChange={handleRangeChange}
                showPreview
                moveRangeOnFirstSelection={false}
                className={"PreviewArea"}
                months={2}
                ranges={[dateRangePicker.selection]}
                direction="horizontal"
            />
            <ButtonGroup>
                <p>{`${start[1]} ${start[2]} ${start[3]} - ${end[1]} ${end[2]} ${end[3]}`}</p>
                <Button size="small" type="primary">
                    Apply
                </Button>
                <Button size="small" type="white" outlined>
                    Cancel
                </Button>
            </ButtonGroup>
        </ItemWrapper>
    );
}

class CustomDateRange extends React.Component<{}, CustomDateRangeState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        };
    }

    disabledStartDate = (startValue: Dayjs | null) => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue: Dayjs | null) => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field: keyof CustomDateRangeState, value: Dayjs | null) => {
        this.setState({
            [field]: value,
        } as unknown as Pick<CustomDateRangeState, keyof CustomDateRangeState>);
    };

    onStartChange = (value: Dayjs | null) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value: Dayjs | null) => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = (open: boolean) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = (open: boolean) => {
        this.setState({ endOpen: open });
    };

    render() {
        const { startValue, endValue, endOpen } = this.state;

        return (
            <div>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                    style={{ margin: '5px' }}
                />

                <DatePicker
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={endValue}
                    placeholder="End"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                    style={{ margin: '5px' }}
                />
            </div>
        );
    }
}

const datePicker = { DateRangePickerOne, CustomDateRange };
export default datePicker;
