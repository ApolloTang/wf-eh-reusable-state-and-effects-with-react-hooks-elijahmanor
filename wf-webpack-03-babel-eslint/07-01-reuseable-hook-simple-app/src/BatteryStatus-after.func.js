


import React, { useState, useEffect } from "react";
import Battery from "./Battery";

const useBattery = () => {

  const [battery, setBattery] = useState({ level: 0, charging: false });

  const handleChange = ({ target: { level, charging } }) =>
    setBattery({ level, charging });


  useEffect(() => {
    let battery;

    navigator.getBattery().then(bat => {
      battery = bat;
      battery.addEventListener("levelchange", handleChange);
      battery.addEventListener("chargingchange", handleChange);
      handleChange({ target: battery });
    });

    return () => {
      battery.removeEventListener("levelchange", handleChange);
      battery.removeEventListener("chargingchange", handleChange);
    };

  }, []);

  return battery
}


function BatteryStatus1 () {
  const battery = useBattery()

  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}

function BatteryStatus2 () {
  const battery = useBattery()

  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}

export {BatteryStatus1, BatteryStatus2}
