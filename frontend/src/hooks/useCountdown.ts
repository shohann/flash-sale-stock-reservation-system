// import { useCallback, useEffect, useState } from "react";

// export default function useCountdown(expiresAt: string) {
//   const calc = useCallback(() => {
//     // Math.max ensures the countdown doesn't go negative
//     return Math.max(
//       0,
//       // Calculate the difference in milliseconds and convert to seconds
//       Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)
//     );
//   }, [expiresAt]); // Dependency: The function only needs to change if expiresAt changes.

//   // 2. State initialization remains correct (using the function initializer).
//   const [seconds, setSeconds] = useState<number>(() => calc());

//   // 3. useEffect now only re-runs when expiresAt or the memoized calc changes (which only happens when expiresAt changes).
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds(calc());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [expiresAt, calc]); // The dependencies are now stable!

//   return seconds;
// }

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
