console.log("hello from heroku");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

let users = [
	{
		firstName: "shivam",
		lastName: "soni",
		mobile: "5345425",
		isSaved: true,
		id: 0,
	},
];

const generateId = () => {
	const maxId = users.length > 0 ? Math.max(...users.map((n) => n.id)) : 0;
	return maxId + 1;
};

app.post("/api/users", (request, response) => {
	console.log("request", request);
	const body = request.body;

	if (!body) {
		return response.status(400).json({
			error: "user is missing",
		});
	}

	const user = {
		firstName: body.firstName,
		lastName: body.lastName,
		mobile: body.mobile,
		isSaved: body.isSaved,
		id: generateId(),
	};

	users = users.concat(user);
	response.json(user);
});

app.get("/api/users", (request, response) => {
	response.json(users);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
