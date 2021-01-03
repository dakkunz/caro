// libs
import Navbar from "@/components/Navbar";
import OnlineUserList from "@/components/OnlineUserList";
import { useAuth0 } from "@auth0/auth0-react";
import { Layout } from "antd";
import React from "react";
import "./style.scss";

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
	const { isAuthenticated } = useAuth0();
	return (
		<Layout className="app-layout-wrapper">
			{isAuthenticated && (
				<Header className="header">
					<Navbar />
				</Header>
			)}
			<Content className="content">
				{children}
				<OnlineUserList />
			</Content>
		</Layout>
	);
};
export default AppLayout;
