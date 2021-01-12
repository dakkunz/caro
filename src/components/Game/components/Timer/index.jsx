import React from "react";
import { useEventTime } from "@/hooks/useEvent";
import { Statistic } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Timer = (props) => {
	// const [countDownTimer, setCountDownTimer] = useState();

	// useEffect(() => {
	// 	console.log("settimeer", countDownTimer);
	// }, [countDownTimer]);

	// useEventTime.removeAllListeners();

	const { roomInfo: { time = 0 } = {} } = useSelector((state) => state.room);
	const [count, setCount] = useState(time);

	// const { Countdown } = Statistic;

	useEffect(() => {
		const counter = setInterval(() => {
			setCount((count) => count - 1);
		}, 1000);
		useEventTime.on("set-time", () => {
			console.log("set-time");
			setCount(time);
		});
		return () => {
			clearInterval(counter);
			useEventTime.removeAllListeners();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (count === 0) {
			handleOverTime();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	const handleOverTime = (e) => {
		props.setIsOverTime(true);
	};

	return (
		<div>{count}</div>
		// <Countdown
		// 	value={Date.now() + time * 1000}
		// 	format="ss"
		// 	onFinish={handleOverTime}
		// />
	);
};

export default Timer;
