import React, { useEffect, useState } from "react";
import axios from "axios";
export const Context = React.createContext("defaultContext");

const AppContext = (props) => {
	const [defaultState, setDefaultState] = useState([]);
	const [mainpara, setPara] = useState("");
	const [res, setRes] = useState({});
	const [colortoggle, setColorToggle] = useState();

	useEffect(() => {
		axios.get("http://localhost:3001/api/users").then((response) => {
			const user = response.data;
			if (user) {
				setDefaultState(user);
				setColorToggle(user.length);
			}
		});
	}, []);

	const setUserData = (data) => {
		setDefaultState([...defaultState, data]);
	};

	let contextValue = {
		defaultState,
		setUserData,
		setPara,
		mainpara,
		setDefaultState,
		res,
		setRes,
		colortoggle,
		setColorToggle,
	};

	return (
		<>
			<Context.Provider value={contextValue}>
				{props.children}
			</Context.Provider>
		</>
	);
};

export default AppContext;
