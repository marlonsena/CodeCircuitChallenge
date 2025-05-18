import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CountdownTimerProps {
  targetDate: string;
  title?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate, title = "Your trip begins in" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculateTimeLeft(): TimeLeft {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="bg-white dark:bg-dark-surface rounded-xl shadow-sm">
      <CardContent className="p-5 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <div id="countdown-timer" className="text-center">
          <div className="flex space-x-2 sm:space-x-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-bold">{timeLeft.days}</span>
              <span className="text-xs sm:text-sm">days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-bold">{timeLeft.hours}</span>
              <span className="text-xs sm:text-sm">hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs sm:text-sm">mins</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs sm:text-sm">secs</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
