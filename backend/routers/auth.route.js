//This file will contain all the routes related to the authentication of the user.
//This file will contain the routes for signup, login, and logout.
//This file will import the controllers from the controllers folder.
//This file will import express from the express module.
//This file will create a router using the express.Router() method.
//This file will have three routes:
//A POST route for the signup functionality.
//A POST route for the login functionality.
//A GET route for the logout functionality.
//This file will export the router.
//This file will be imported in the server.js file.

// backend/routes/auth.routes.js

import express from 'express';
import { signup, login, logout, getCurrentUser } from '../controllers/auth.controller.js';
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js"
import { getDashboard } from "../controllers/dashboard.controller.js";
import { addJob } from "../controllers/job.controller.js";


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout); // ✅ Change from POST to GET
 // Ensure it's a POST request
router.get('/current-user', protectRoute, getCurrentUser);


// 📌 Route: Dashboard (Accessible by 'admin' and 'user')
router.get("/dashboard", protectRoute, authorizeRoles("admin", "user"), getDashboard);

// 📌 Route: Add Job (Accessible by 'admin' only)
router.post("/add-job", protectRoute, authorizeRoles("admin"), addJob);


export default router;
