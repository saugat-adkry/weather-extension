import React,{ useState, useEffect } from "react";
import { Weather } from "./Weather";

export const Background = () => {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    setIsDay(hours > 6 && hours < 18);
  }, []);

  return (
    <div
      className={`w-full h-full bg-gradient-to-b ${
        isDay ? "from-daySky-top to-daySky-bottom" : "from-nightSky-top to-nightSky-bottom"
      }`}
    >
<Weather />
    </div>
  );
};