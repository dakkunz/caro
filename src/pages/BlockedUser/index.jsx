import useAuth from "@/hooks/useAuth";
import { Button, Result } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";

const BlockedUser = () => {
	const { logout, user } = useAuth();
	const { isLocked } = user || {};

	return !isLocked ? (
		<Redirect to="/" />
	) : (
		<div className="blocked-user-wrapper">
			<Result
				status="error"
				title="Tài khoản của bạn đã bị khóa"
				extra={
					<Button type="primary" onClick={logout}>
						Đăng xuất
					</Button>
				}
			/>
		</div>
	);
};

export default BlockedUser;
