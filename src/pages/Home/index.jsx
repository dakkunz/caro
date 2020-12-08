// libs
import useAuth from "@/hooks/useAuth";
import React from "react";
// components
// others
import "./styles.scss";

const Home = () => {
	const { signin } = useAuth();
	console.log(signin);
	return (
		<div className="home-wrapper">
			<button onClick={() => signin()}>login</button>
		</div>
	);
};
export default Home;
