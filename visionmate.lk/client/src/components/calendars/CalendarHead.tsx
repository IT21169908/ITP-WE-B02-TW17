import React, { useState } from 'react';
// import UilPrint from '@iconscout/react-unicons/icons/uil-print';
// import UilBookOpen from '@iconscout/react-unicons/icons/uil-book-open';
import { Link } from 'react-router-dom';
// import Calendar from 'react-calendar';
// import Value from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Cards } from '../cards/frame/CardFrame';
import { CalendarWrapper } from '../styled-components/styled-containers';

function CalenderHead(): JSX.Element {

    const [value, onChange] = useState<any>(new Date());

    const moreContent = (
        <>
            <Link to="#">
                {/*<UilPrint />*/}
                <span>Printer</span>
            </Link>
            <Link to="#">
                {/*<UilBookOpen />*/}
                <span>PDF</span>
            </Link>
        </>
    );
    const [state, setState] = useState<{ date: Date }>({
        date: new Date(),
    });

    // const onChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     if (value instanceof Date) {
    //         setState({ date: value });
    //     }
    // };

    return (
        <Cards title="Calendar 2022" more={moreContent}>
            <CalendarWrapper className="ninjadash-calendar-with-head">
                <div className="ninjadash-calendar-widget">
                    {/*<Calendar next2Label={null} prev2Label={null} onChange={onChange} value={value} />*/}
                </div>
            </CalendarWrapper>
        </Cards>
    );
}

export default CalenderHead;
