"use client"

import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return <span>{time > 0 ? "Time Left: " + time : "Expired"}</span>;
};

export default CountdownTimer;
