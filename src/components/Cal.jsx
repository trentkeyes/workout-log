import { useState } from 'react';
import Calendar from 'react-calendar';

export default function Cal() {
  const [calValue, onChangeCal] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onClickDay = (day) => {
    setSelectedDate(day);
  };
  const changeDay = (startDate, days) => {
    const newDay = new Date();
    newDay.setDate(startDate.getDate() + days);
    console.log('start', startDate, 'newDay', newDay);
    setSelectedDate(newDay);
  };

  return (
    <div>
      <Calendar
        onChange={onChangeCal}
        value={calValue}
        onClickDay={onClickDay}
        className="max-w-xs"
      />
      <div>
        <button onClick={() => changeDay(selectedDate, -1)}>
          Previous Day
        </button>
        <button onClick={() => changeDay(selectedDate, 1)}>Next Day</button>
      </div>
    </div>
  );
}
