import { useState } from "react";

const Calculate = (date: string) => {
  const [day, setDay] = useState<number | undefined>(undefined);
  const [hour, setHour] = useState<number | undefined>(undefined);
  const [minute, setMinute] = useState<number | undefined>(undefined);
  const [seconds, setSeconds] = useState<number | undefined>(undefined);

  const countdown = () => {
    const countDate = new Date(date).getTime();
    const now = new Date().getTime();

    const interval = countDate - now;

    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;

    const dayNumber = Math.floor(interval / day);
    const hourNumber = Math.floor((interval % day) / hour);
    const minuteNumber = Math.floor((interval % hour) / minute);
    const secondNumber = Math.floor((interval % minute) / second);

    setDay(dayNumber);
    setHour(hourNumber);
    setMinute(minuteNumber);
    setSeconds(secondNumber);
  };

  setInterval(countdown, 1000);

  return [day, hour, minute, seconds];
};

export default Calculate;
