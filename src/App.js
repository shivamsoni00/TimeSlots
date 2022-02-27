import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import TimeSlot from "./components/timeslot/timeslo";
import UserForm from "./components/form/Form";

import AppContext from "./context";


function App() {
	return (
		<AppContext>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<TimeSlot />} />
					<Route path="/slots/userInfo/:id" element={<UserForm />} />
				</Routes>
			</div>
		</AppContext>
	);
}

export default App;
