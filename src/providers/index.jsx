// libs
import AuthProvider from "@/providers/AuthProvider";
import OnlineProvider from "@/providers/OnlineProvider";
import React from "react";

const providers = [OnlineProvider, AuthProvider];

const AppProviders = ({ children }) =>
	providers.reduce(
		(providerAccumulator, Provider) => (
			<Provider>{providerAccumulator}</Provider>
		),
		children
	);

export default AppProviders;
