import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Status = () => {
	const {
		data: { history = [], xPlayer, oPlayer, winner, isDraw },
		step = 0,
	} = useSelector((state) => state.gameReplay);

	let result;
	if (isDraw) result = "Hòa";
	else
		result =
			"Thắng cuộc: " +
			(winner === xPlayer.sub ? xPlayer.displayName : oPlayer.displayName);

	return (
		<div className="status-wrapper" style={{ textAlign: "center" }}>
			<h3 style={{ height: 30, color: "#87d068" }}>
				{step === history.length - 1 && result}
			</h3>
		</div>
	);
};
export default Status;
