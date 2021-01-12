import { SOCKET_TYPES } from "@/constants/socketTypes";
import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import { Form, Input, InputNumber, Modal } from "antd";
import React from "react";

const RoomModal = ({ show, hide }) => {
	const socket = useSocket();
	const [form] = Form.useForm();
	const { user } = useAuth();

	return (
		<Modal
			title="Create Room"
			centered
			width={400}
			closable
			okText="Create"
			onCancel={hide}
			visible={show}
			onOk={() => {
				form.submit();
				hide();
			}}
		>
			<Form
				initialValues={{ roomName: user.displayName + " Room", time: 30 }}
				form={form}
				onFinish={({ roomName, password, time }) => {
					socket.emit(
						SOCKET_TYPES.CREATE_ROOM_REQUEST,
						roomName,
						password,
						time
					);
				}}
				layout="vertical"
			>
				<Form.Item
					name="roomName"
					rules={[{ required: true }]}
					label="Room Name"
				>
					<Input />
				</Form.Item>
				<Form.Item name="password" label="Password">
					<Input.Password />
				</Form.Item>
				<Form.Item name="time" label="Timeout">
					<InputNumber style={{ width: "100%" }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default RoomModal;
