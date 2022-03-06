import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Context } from "../../context";
import { useParams } from "react-router";

import "./form.css";

function Form() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobile, setMobile] = useState("");

	const contextval = useContext(Context);
	const {
		defaultState,
		setUserData,
		setPara,
		setRes,
		mainpara,
		colortoggle,
		setColorToggle,
		res,
	} = contextval;
	let { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const dcuk = async () => {
			console.log("id", id);
			console.log("from useeffect setDefaultState", colortoggle);
			await setPara(id);
		};
		dcuk();
	}, [id, colortoggle, setPara]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const formVal = {
			firstName,
			lastName,
			mobile,
			isSaved: true,
		};

		console.log("formVal", formVal);

		axios
			.post("http://localhost:3001/api/users", formVal)
			.then((response) => {
				if (response) {
					console.log("response.data", response.data);
					setUserData(response.data);
					setRes(response);
					setColorToggle(colortoggle + 1);
				}
			});

		setFirstName("");
		setLastName("");
		
		setMobile("");

		await navigate("/");
	};

	const cancelHandler = async () => {
		if (!res) {
			// setColorToggle(!colortoggle);
		}
		await navigate("/");
	};

	const EditUserHandle = () => {
		setFirstName(defaultState[id]?.firstName);
		setLastName(defaultState[id]?.lastName);
		setMobile(defaultState[id]?.mobile);
	};
	return (
		<>
			<div className="form-container">
				<form
					onSubmit={(e) => handleFormSubmit(e)}
					className="slot-form"
				>
					<div className="field-container">
						<label className="label" htmlFor="firstName">
							FirstName:
						</label>
						<input
							required
							type="text"
							className="form-field"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className="field-container">
						<label className="label" htmlFor="lastName">
							LastName:
						</label>
						<input
							required
							type="text"
							className="form-field"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div className="field-container">
						<label className="label" htmlFor="mobile">
							Mobile:
						</label>
						<input
							required
							type="text"
							className="form-field"
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
						/>
					</div>

					<div className="btns">
						<button type="submit" className="btn">
							Save
						</button>
						<button onClick={cancelHandler} className="btn">
							Cancel
						</button>
					</div>
				</form>
			</div>

			<div className="user-info">
				<h3>User info</h3>
				{defaultState &&
					defaultState.length > 0 &&
					defaultState.map((user, index) => (
						<div
							style={{ fontWeight: "570", fontSize: "1.1rem" }}
							key={index}
						>
							{console.log(
								"index userid mainpara",
								index,
								user.id,
								mainpara
							)}
							{Number(mainpara) === user.id ? (
								<>
									<p>FirstName:{user.firstName}</p>
									<p>LastName: {user.lastName}</p>
									<p>Mobile: {user.mobile}</p>
								</>
							) : (
								""
							)}
						</div>
					))}

				<button onClick={EditUserHandle} className="btn">
					Edit user info
				</button>
			</div>
		</>
	);
}

export default Form;
