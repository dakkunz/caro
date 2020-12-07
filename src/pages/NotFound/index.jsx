// libs
import React from "react";
import { Button, Result } from "antd";
// others
import "./styles.scss";
import { useHistory } from "react-router-dom";

const NotFound = () => {
	const { push } = useHistory();
	return (
		<div className="not-found-wrapper">
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button type="primary" onClick={() => push("/")}>
						Back Home
					</Button>
				}
			/>
		</div>
	);
};
export default NotFound;
