import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
    try {
        const { name, username, email, password, role = "user" } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            username,
            role
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("jwt-hirehub", token, {
            httpOnly: true,  
            maxAge: 3 * 24 * 60 * 60 * 1000,  
            sameSite: "strict",  
            secure: false,  // ✅ Set to false in local development
        });
        

        res.status(201).json({ message: "User registered successfully", role: user.role });

        const profileUrl = `${process.env.CLIENT_URL}/profile/${user.username}`;

        try {
            await sendWelcomeEmail(user.email, user.name, profileUrl);
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            // Optionally send a response indicating the failure to send the email
        }

    } catch (error) {
        console.log("Error in signup:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { role, username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Role check AFTER finding the user
        if (user.role !== role) {
            return res.status(403).json({ message: "Unauthorized role access" });
        }

        // Password verification
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("jwt-hirehub", token, {
            httpOnly: true,  
            maxAge: 3 * 24 * 60 * 60 * 1000,  
            sameSite: "strict",  
            secure: false,  // ✅ Set to false in local development
        });
        
        

        res.json({ message: "Logged in successfully", token, role: user.role });

    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

     
export const logout = (req, res) => {
    res.clearCookie("jwt-hirehub", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict" 
    });
    res.status(200).json({ message: "Logged out successfully" });
};


export const getCurrentUser = async (req, res) => {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      res.json(req.user);
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const getDashboard = async (req, res) => {
    try {
        res.json({ message: `Welcome to your dashboard, ${req.user.role}` });
    } catch (error) {
        console.error("Error in getDashboard controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const addJob = async (req, res) => {
    try {
        res.json({ message: "Job added successfully!" });
    } catch (error) {
        console.error("Error in addJob controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
