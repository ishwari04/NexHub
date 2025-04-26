// This file will contain schema of user collection.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        role: { type: String, default: "user" } ,// New field to define user roles
		profilePicture: {
			type: String,
			default: "",
		},
		bannerImg: {
			type: String,
			default: "",
		},
		headline: {
			type: String,
			default: "Hirehub User",
		},
		location: {
			type: String,
			default: "Nagpur, Maharashtra, India, Earth",
		},
		about: {
			type: String,
			default: "",
		},
        education: [
			{
				school: String,
				fieldOfStudy: String,
				startYear: Number,
				endYear: Number,
			},
		],
		skills: [
            {
                Skill: String,
				Skill_Level: {
					type: Number,
					min: 1,
					max: 3
				}

            }
        ],
		projects: [
			{
				title: String,
				description: String,
				link: String,
				technologies: [String],
			},
		],
		experience: [
			{
				title: String,
				company: String,
				startDate: Date,
				endDate: Date,
				description: String,
			},
		],
		languages: [
            {
                Foreign_Language: String,
                Proficiency_Level: {
					type: Number,
					min: 1,
					max: 3
				}
            }
        ],
		publications: [
			{
				title: { type: String, required: true },
				link: { type: String, required: false }, // Optional if not available
				description: { type: String, required: false },
				type: { 
					type: String, 
					enum: ["Journal", "Research Paper", "Conference Paper"], 
					required: true 
				},
				journalOrConference: { type: String, required: false }, // Journal name or conference name
				authors: { type: String, required: true }, // Author names as a string
				date: { type: Date, required: true }
			}
		],
		
		internships: [
			{
				title: String,
				company: String,
				startDate: Date,
				endDate: Date,
				description: String,
			},
		],
        certification: [
			{
				title: String,
				company: String,
				courseDuration: Number,
                issuedDate: Date,
				description: String,
			},
		],
		connections: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;