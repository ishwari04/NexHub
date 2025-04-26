//this is the main file of the backend
//this file will be used to run the server
//this file will be used to connect to the database, routes, controllers,models,middlewares,helpers,utils,validators,services,configurations,constants,errors
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routers/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/user.route.js";
import jobRoutes from "./routers/job.route.js"; // Ensure correct path to job routes
import cors from "cors";
import path from "path";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}

app.use(express.json({ limit: "5mb" })); // parse JSON request bodies

app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/jobs", jobRoutes); // Register jobs routes

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/HireHub/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "HireHub", "dist", "index.html"));
	});
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
