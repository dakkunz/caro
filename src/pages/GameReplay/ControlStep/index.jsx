import { setReplayStep } from "@/actions/GameReplay";
import {
	FastBackwardOutlined,
	FastForwardOutlined,
	LeftCircleFilled,
	RightCircleFilled,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ControlStep = () => {
	const {
		step,
		data: { history = [] },
	} = useSelector((state) => state.gameReplay);
	const dispatch = useDispatch();

	const handleStep = (diff = 0) => {
		dispatch(setReplayStep(step + diff));
	};

	return (
		<div className="control-step-wrapper">
			<Space>
				<Button
					icon={<FastBackwardOutlined />}
					size="large"
					disabled={step === 0}
					onClick={() => dispatch(setReplayStep(0))}
				>
					Đầu tiên
				</Button>
				<Button
					icon={<LeftCircleFilled />}
					size="large"
					type="primary"
					disabled={step === 0}
					onClick={() => handleStep(-1)}
				>
					Về trước
				</Button>
				<Button
					icon={<RightCircleFilled />}
					size="large"
					type="primary"
					disabled={step === history.length - 1}
					onClick={() => handleStep(1)}
				>
					Tiếp theo
				</Button>
				<Button
					icon={<FastForwardOutlined />}
					size="large"
					disabled={step === history.length - 1}
					onClick={() =>
						dispatch(setReplayStep(Math.max(history.length - 1, 0)))
					}
				>
					Cuối cùng
				</Button>
			</Space>
		</div>
	);
};

export default ControlStep;
