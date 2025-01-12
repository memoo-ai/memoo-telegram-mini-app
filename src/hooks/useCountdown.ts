import { useState, useEffect } from 'react';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  startCountdown: (time: number) => void;
  stopCountdown: () => void;
}

/**
 * The `useCountdown` hook calculates and updates the days, hours, minutes, and
 * seconds remaining until a target timestamp.
 * @returns An object with properties `days`, `hours`, `minutes`, `seconds`,
 * `startCountdown`, and `stopCountdown`.
 */
export function useCountdown(): Countdown {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  let targetTimestamp = 0;

  const calculateTimeLeft = () => {
    const now = Date.now();
    const distance = targetTimestamp - now;

    if (distance < 0) {
      // Countdown finished
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      return;
    }

    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  };

  const startCountdown = (time: number) => {
    targetTimestamp = time;
    calculateTimeLeft(); // Initial calculation
    const id = setInterval(calculateTimeLeft, 1000);
    setIntervalId(id);
  };

  const stopCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Cleanup on unmount
      }
    };
  }, [intervalId]);

  return {
    days,
    hours,
    minutes,
    seconds,
    startCountdown,
    stopCountdown,
  };
}
