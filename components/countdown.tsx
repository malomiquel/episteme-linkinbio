"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
}

function getTimeLeft(targetDate: string) {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return null;
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] =
    useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    function update() {
      setTimeLeft(getTimeLeft(targetDate));
    }

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <p className="font-(family-name:--font-playfair) italic text-gold text-base mb-5">
        L&apos;événement a commencé !
      </p>
    );
  }

  const units = [
    { value: timeLeft.days, label: "Jours" },
    { value: timeLeft.hours, label: "Heures" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6 mb-5">
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-3xl sm:text-4xl font-semibold text-gold-light font-(family-name:--font-inter) tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-[2px] text-cream/40 mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
