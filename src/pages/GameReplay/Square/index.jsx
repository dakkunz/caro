import { playerColorMapping } from "@/pages/GameReplay/mapping";
import { Button } from "antd";
import classnames from "classnames";
import React from "react";
import "./style.scss";

const Square = ({ value, isWinCell, isCurrent }) => (
	<Button
		className={classnames("square-wrapper", {
			current: isCurrent,
			"win-cell": isWinCell,
		})}
		style={{
			color: value === "X" ? playerColorMapping.X : playerColorMapping.O,
		}}
	>
		{value || " "}
	</Button>
);
export default Square;
