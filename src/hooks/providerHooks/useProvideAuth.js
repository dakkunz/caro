import { useEffect, useState } from "react";
import Axios from "axios";
import { message } from "antd";
import jwtDecode from "jwt-decode";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "@/config/firebase.json";
import { API_URL } from "@/config/URL";
import socket from "@/config/socket";

firebase.initializeApp(firebaseConfig);

const useProvideAuth = () => {
	const [user, setUser] = useState(null);

	const loginWithUsername = ({ userName, password }, cb) => {
		Axios.post(API_URL + "/users/login", { userName, password })
			.then(({ data: { token, ...user } }) => {
				localStorage.setItem("token", token);
				setUser(user);
				socket.emit("user-online", user);
			})
			.catch(({ response }) => {
				response && response.data.message
					? message.error(response.data.message)
					: message.error("Login Fail");
			})
			.finally(() => cb());
	};

	const checkUserExist = (token, cb) => {
		 Axios.post(API_URL + "/users/login-social", token)
			.then(({ data: { token, ...user } }) => {
				localStorage.setItem("token", token);
				setUser(user);
				socket.emit("user-online", user);
			})
			.catch(({ response }) => {
				response && response.data.message
					? message.error(response.data.message)
					: message.error("Login Fail");
			})
			.finally(() => cb());
	};

	const loginWithGoogle = (cb) =>{
		firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(({ user }) =>
				user.getIdTokenResult().then((token) => checkUserExist(token, cb))
			)
			.catch(() => message.error("Login Fail"));}

	const loginWithFacebook = (cb) =>
		firebase
			.auth()
			.signInWithPopup(new firebase.auth.FacebookAuthProvider())
			.then(({ user }) =>
				user.getIdTokenResult().then((token) => checkUserExist(token, cb))
			)
			.catch(() => message.error("Login Fail"));

	const registerWithUsername = (user, cb) => {
		Axios.post(API_URL + "/users/signup", user)
			.then(({ data: { token, ...user } }) => {
				localStorage.setItem("token", token);
				setUser(user);
			})
			.catch(({ response }) => {
				response && response.data.message
					? message.error(response.data.message)
					: message.error("Register Fail");
			})
			.finally(() => cb());
	};

	const logout = () => {
		Axios.post(API_URL + "/users/logout", { userId: user.userId }).catch(
			({ response }) => {
				response && response.data.message
					? message.error(response.data.message)
					: message.error("Logout Fail");
			}
		);
		setUser(false);
		localStorage.removeItem("token");
		firebase.auth().signOut();
	};

	const checkToken = (token) => {
		if (token) {
			try {
				const user = jwtDecode(token);
				setUser(user);
			} catch {
				setUser(false);
				localStorage.removeItem("token");
			}
		} else setUser(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		setTimeout(() => {
			checkToken(token);
		}, 500);
	}, []);

	return {
		user,
		loginWithUsername,
		registerWithUsername,
		loginWithGoogle,
		loginWithFacebook,
		logout,
	};
};

export default useProvideAuth;
