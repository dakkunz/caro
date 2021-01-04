import React from "react";
import { Prompt } from "react-router-dom";

const ResetState = () => {
	return <Prompt message={() => "Do you want to leave Room"} />;
};

export default ResetState;
