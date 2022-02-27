import React, { useState, useContext } from "react";
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
	const { defaultState, setUserData, setPara, setRes } = contextval;
	let { id } = useParams();
	const navigate = useNavigate();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const formVal = {
			firstName,
			lastName,
			mobile,
			isSaved: true,
		};

		await setPara(id);

		axios.post("http://localhost:3001/users", formVal).then((response) => {
			console.log("response.data", response.data);
			setUserData(response.data);
			setRes(response);
		});

		setFirstName("");
		setLastName("");
		setMobile("");

		await navigate("/");
	};

	const cancelHandler = async () => {
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
							{index === Number(id) ? (
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
