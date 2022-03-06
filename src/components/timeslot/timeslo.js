import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../context";
import "./timeslo.css";

function TimeSlot() {
	const [timeSlots, setTimeSlots] = useState([]);

	const context = useContext(Context);
	const { mainpara, colortoggle, defaultState } = context;

	useEffect(() => {
		const slotConfig = {
			configSlotHours: "01",
			timeArr: [{ startTime: "08:00", endTime: "17:00" }],
		};

		function createSlots() {
			const { configSlotHours, timeArr } = slotConfig;

			let defaultDate = new Date().toISOString().substring(0, 10);
			let slotsArray = [];
			let _timeArrStartTime;
			let _timeArrEndTime;
			let _tempSlotStartTime;
			let _endSlot;
			let _startSlot;

			for (let i = 0; i < timeArr.length; i++) {
				_timeArrStartTime = new Date(
					defaultDate + " " + timeArr[i].startTime
				).getTime();

				_timeArrEndTime = new Date(
					defaultDate + " " + timeArr[i].endTime
				).getTime();
				_tempSlotStartTime = _timeArrStartTime;

				// Loop around till _tempSlotStartTime is less end time from timeArr
				while (
					new Date(_tempSlotStartTime).getTime() <
					new Date(_timeArrEndTime).getTime()
				) {
					_endSlot = new Date(_tempSlotStartTime);
					_startSlot = new Date(_tempSlotStartTime);

					//Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
					_tempSlotStartTime = _endSlot.setHours(
						parseInt(_endSlot.getHours()) +
							parseInt(configSlotHours)
					);
					_tempSlotStartTime = _endSlot.setMinutes(
						parseInt(_endSlot.getMinutes())
					);

					// Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
					if (
						new Date(_tempSlotStartTime).getTime() <=
						new Date(_timeArrEndTime).getTime()
					) {
						// DateTime object is converted to time with the help of  functions

						slotsArray.push({
							timeSlotStart: new Date(
								_startSlot
							).toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							}),
							timeSlotEnd: _endSlot.toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							}),
						});
					}

					_tempSlotStartTime = _endSlot.setMinutes(
						_endSlot.getMinutes()
					);
				}
			}

			setTimeSlots(slotsArray);
			return slotsArray;
		}
		createSlots();
	}, []);

	return (
		<>
			<div className="time-container">
				<h2>TimeSlot</h2>
				<div className="slot-container">
					{console.log(
						"colortoggle",
						colortoggle,
						defaultState.length
					)}
					{timeSlots &&
						timeSlots.map((slot, index) => (
							<div
								key={index}
								className={`slot ${
									index === Number(mainpara) && colortoggle
										? "slot-red"
										: ""
								}`}
							>
								<button style={{ padding: "1rem" }}>
									<Link
										className="slot-link"
										target="_blank"
										to={`/slots/userInfo/${index}`}
									>
										{slot.timeSlotStart} {slot.timeSlotEnd}
									</Link>
								</button>
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default TimeSlot;
