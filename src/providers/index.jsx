// libs
import AuthProvider from "@/providers/AuthProvider";
import React from "react";
// components

const providers = [AuthProvider];

const AppProviders = ({ children }) =>
	providers.reduce(
		(providerAccumulator, Provider) => (
			<Provider>{providerAccumulator}</Provider>
		),
		children
	);

export default AppProviders;
