import { useCallback, useEffect, useState } from "react";

export default function useCountdown(expiresAt: string) {
  const calc = useCallback(() => {
    return Math.max(
      0,
      Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)
    );
  }, [expiresAt]);

  const [seconds, setSeconds] = useState<number>(() => calc());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(calc());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, calc]);

  const isExpired = seconds === 0;
  return { seconds, isExpired };
}
