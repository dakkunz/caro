import Fab from "@/components/Fab";
import Home from "@/pages/Home";
import AppProviders from "@/providers";
import React from "react";

const App = () => (
	<AppProviders>
		<Home />
		<Fab />
	</AppProviders>
);
export default App;
