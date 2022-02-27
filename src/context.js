import React, { useEffect, useState } from "react";
import axios from "axios";
export const Context = React.createContext("defaultContext");

const AppContext = (props) => {
	const [defaultState, setDefaultState] = useState([]);
	const [mainpara, setPara] = useState("");
	const [res, setRes] = useState({});

	useEffect(() => {
		axios.get("http://localhost:3001/users").then((response) => {
			const user = response.data;
			setDefaultState(user);
		});
	}, []);

	const setUserData = (data) => {
		console.log("data", data);
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
