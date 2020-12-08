import { useEffect, useState } from "react";
import Axios from "axios";
import { message } from "antd";
import jwtDecode from "jwt-decode";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "@/config/firebase.json";
import API_URL from "@/config/API";

firebase.initializeApp(firebaseConfig);

const useProvideAuth = () => {
	const [user, setUser] = useState(null);

	const loginWithUsername = ({ username, password }) => {
		Axios.post(API_URL + "/login", { username, password })
			.then(({ data: { user, token } }) => {
				localStorage.setItem("token", token);
				setUser(user);
			})
			.catch((err) => {
				console.log(err.reponse);
				message.error("Login Fail");
			});
	};

	const checkUserExist = ({ email, uid, photoURL }) => {
		Axios.post(API_URL + "/check-user", { email, uid, photoURL })
			.then(({ data: { user, token } }) => {
				localStorage.setItem("token", token);
				setUser(user);
			})
			.catch((err) => {
				console.log(err.reponse);
				message.error("Login Fail");
			});
	};

	const loginWithGoogle = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(({ user }) => {
				setUser(user);
				// checkUserExist({ email, uid, photoURL });
			})
			.catch(() => message.error("Login Fail"));
	};

	const loginWithFacebook = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.FacebookAuthProvider())
			.then(({ user: { email, uid, photoURL } }) => {
				checkUserExist({ email, uid, photoURL });
			})
			.catch(() => message.error("Login Fail"));
	};

	const registerWithUsername = ({ username, password }) => {
		Axios.post(API_URL + "/register", { username, password })
			.then(({ data: { user, token } }) => {
				localStorage.setItem("token", token);
				setUser(user);
			})
			.catch((err) => {
				console.log(err.reponse);
				message.error("Register Fail");
			});
	};

	const logout = () => {
		setUser(false);
		localStorage.removeItem("token");
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
		}, 1000);
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
