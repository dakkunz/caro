import { Button, Form, Input } from "antd";
import React from "react";
import "./style.scss";
import moment from "moment";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useDispatch } from "react-redux";
import { getUserInfo } from "@/actions/profile";

const UserInfo = () => {
	const { user } = useAuth();
	const axios = useAxios();
	const dispatch = useDispatch();

	return (
		<div className="user-info-wrapper">
			<Form
				initialValues={{
					...user,
					displayName: user.displayName || user.name,
					joinDate: moment(
						new Date(user["https://carona.netlify.app/created_at"])
					).format("DD/MM/YYYY HH:mm"),
				}}
				layout="vertical"
				onFinish={({ displayName }) => {
					axios
						.post("/users/info/update", {
							displayName,
						})
						.then((res) => {
							dispatch(getUserInfo(res.data));
						});
				}}
			>
				<Form.Item
					name="displayName"
					label="Display Name"
					rules={[{ required: true }]}
				>
					<Input size="large" />
				</Form.Item>
				<Form.Item name="email" label="Email">
					<Input size="large" readOnly />
				</Form.Item>
				<Form.Item name="joinDate" label="Ngày tham gia">
					<Input size="large" readOnly />
				</Form.Item>
				<div className="button">
					<Button type="primary" htmlType="submit" size="large" shape="round">
						Cập nhật thông tin
					</Button>
				</div>
			</Form>
		</div>
	);
};
export default UserInfo;
