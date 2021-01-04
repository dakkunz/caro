import React from "react";
import { Redirect } from "react-router-dom";

const withRoomInfoRequired = (roomInfo) => (InnerComponent) =>
	roomInfo ? InnerComponent : <Redirect to="/" />;

export default withRoomInfoRequired;
