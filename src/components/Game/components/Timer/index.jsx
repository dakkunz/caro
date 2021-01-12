import React, { useState } from "react";
import { useEventTime } from "@/hooks/useEvent";
import { Statistic } from "antd";

const Timer = (props) => {

  const [countDownTimer, setCountDownTimer] = useState();

  useEventTime.removeAllListeners();

  useEventTime.on("set-time", () => {
    console.log("set-time");
    setCountDownTimer(props.roomTime);
    useEventTime.removeAllListeners();
  });

  const { Countdown } = Statistic;

  const handleOverTime = (e) => {
    props.setIsOverTime(true);
  };


  return (
    <Countdown
      value={Date.now() + countDownTimer * 1000}
      format="ss"
      onFinish={handleOverTime}
    />
  );
};


export default Timer;
