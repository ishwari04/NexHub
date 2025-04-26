import { mailtrapClient, sender } from "../lib/mailtrap.js";
//import User from "../models/user.model.js";
import { createWelcomeEmailTemplate,
	
} from "./emailTemplates.js";
// createCommentNotificationEmailTemplate,
// 	createConnectionAcceptedEmailTemplate,
// 	
//     createJobNotificationEmailTemplate,

export const sendWelcomeEmail = async (email, name, profileUrl) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Welcome to HireHub",
			html: createWelcomeEmailTemplate(name, profileUrl),
			category: "welcome",
		});

		console.log("Welcome Email sent succesffully", response);
	} catch (error) {
		throw error;
	}
};

// export const sendCommentNotificationEmail = async (
// 	recipientEmail,
// 	recipientName,
// 	commenterName,
// 	postUrl,
// 	commentContent
// ) => {
// 	const recipient = [{ email: recipientEmail }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "New Comment on Your Post",
// 			html: createCommentNotificationEmailTemplate(recipientName, commenterName, postUrl, commentContent),
// 			category: "comment_notification",
// 		});
// 		console.log("Comment Notification Email sent successfully", response);
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
// 	const recipient = [{ email: senderEmail }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: `${recipientName} accepted your connection request`,
// 			html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
// 			category: "connection_accepted",
// 		});
// 	} catch (error) {}
// };

// // Send Job Notification Email (Bulk Email)
// export const sendJobNotificationEmail = async (adminName, jobTitle, jobDescription, jobUrl) => {
// 	try {
// 		const users = await User.find({}, "email name");

// 		if (users.length === 0) {
// 			console.log("No users found to send notifications.");
// 			return;
// 		}

// 		const emailContent = createJobNotificationEmailTemplate(adminName, jobTitle, jobDescription, jobUrl);
// 		const batchSize = 50;

// 		for (let i = 0; i < users.length; i += batchSize) {
// 			const batch = users.slice(i, i + batchSize);
// 			const recipients = batch.map(user => ({ email: user.email }));

// 			try {
// 				const response = await mailtrapClient.bulk.send({
// 					from: sender,
// 					to: recipients,
// 					subject: `New Job Requirement: ${jobTitle}`,
// 					html: emailContent,
// 					category: "job_notification",
// 				});
// 				console.log(`✅ Job Notification Emails sent successfully to batch ${i / batchSize + 1}`, response);
// 			} catch (error) {
// 				console.error(`❌ Failed to send emails to batch ${i / batchSize + 1}:`, error.message);
// 			}
// 		}
// 	} catch (error) {
// 		console.error("❌ Failed to send job notification emails:", error.message);
// 		throw error;
// 	}
// };