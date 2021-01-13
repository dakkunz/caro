import Config from "@/constants/configs";
import { playerColorMapping } from "@/pages/GameReplay/mapping";
import { Button } from "antd";
import classnames from "classnames";
import React from "react";
import "./style.scss";

const Square = (props) => {
	const { value } = props;
	const { winCell } = props;
	const { isCurrentCell } = props;

	return (
		<Button
			className={classnames("square-wrapper", {
				current: isCurrentCell,
				"win-cell": winCell,
			})}
			onClick={() => props.handleClick(props.row, props.col)}
			style={{
				color:
					value === Config.xPlayer
						? playerColorMapping.X
						: playerColorMapping.O,
			}}
		>
			{value || " "}
		</Button>
	);
};

export default Square;
