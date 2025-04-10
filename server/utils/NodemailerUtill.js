import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "Meeting Hall Team <no-reply@meetinghall.com>",
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    if (error.responseCode === 550) {
      console.error("Failed to send email: Recipient address does not exist.");
      return { success: false, message: "Recipient address does not exist." };
    } else {
      console.error("Failed to send email:", error);
      return {
        success: false,
        message: "An error occurred while sending the email.",
      };
    }
  }
};

// import { sendEmail } from "./emailService.js"; // Adjust the path as necessary

// const sendNotification = async () => {
//   try {
//     const response = await sendEmail(
//       "recipient@example.com",
//       "Welcome!",
//       "This is a test email sent using Nodemailer with ES modules."
//     );
//     console.log(response.message);
//   } catch (error) {
//     console.error("Failed to send email:", error);
//   }
// };

// sendNotification();
