import nodemailer from 'nodemailer';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create reusable transporter using Gmail
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
};

// Send contact message via email
export const sendContactMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
        throw new ApiError(400, 'All fields (name, email, subject, message) are required');
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, 'Please provide a valid email address');
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
        throw new ApiError(500, 'Email service is not configured');
    }

    const transporter = createTransporter();

    // Email to portfolio owner (notification)
    const ownerMailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `📬 New Contact: ${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; color: #c9d1d9; padding: 30px; border-radius: 12px; border: 1px solid #30363d;">
                <h2 style="color: #58a6ff; margin-bottom: 20px; border-bottom: 1px solid #30363d; padding-bottom: 15px;">
                    📬 New Portfolio Contact Message
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; width: 100px; font-weight: bold;">Name:</td>
                        <td style="padding: 10px 0; color: #c9d1d9;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; font-weight: bold;">Email:</td>
                        <td style="padding: 10px 0;">
                            <a href="mailto:${email}" style="color: #58a6ff;">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #8b949e; font-weight: bold;">Subject:</td>
                        <td style="padding: 10px 0; color: #c9d1d9;">${subject}</td>
                    </tr>
                </table>
                <div style="margin-top: 20px; background: #161b22; padding: 20px; border-radius: 8px; border: 1px solid #30363d;">
                    <p style="color: #8b949e; margin: 0 0 10px; font-weight: bold;">Message:</p>
                    <p style="color: #c9d1d9; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
                <p style="margin-top: 20px; color: #8b949e; font-size: 12px;">
                    Sent from your portfolio contact form at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
            </div>
        `,
    };

    // Auto-reply email to the sender
    const senderMailOptions = {
        from: `"Aman Raghuwanshi" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `✅ Thanks for reaching out, ${name}!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; color: #c9d1d9; padding: 30px; border-radius: 12px; border: 1px solid #30363d;">
                <h2 style="color: #58a6ff; margin-bottom: 20px;">
                    Hi ${name}! 👋
                </h2>
                <p style="line-height: 1.8; color: #c9d1d9;">
                    Thank you for reaching out! I've received your message and will get back to you as soon as possible — usually within 24-48 hours.
                </p>
                <div style="margin: 25px 0; background: #161b22; padding: 20px; border-radius: 8px; border: 1px solid #30363d;">
                    <p style="color: #8b949e; margin: 0 0 8px; font-size: 13px; font-weight: bold;">Your message:</p>
                    <p style="color: #c9d1d9; margin: 0; font-style: italic; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
                <p style="line-height: 1.8; color: #c9d1d9;">
                    In the meantime, feel free to check out my projects on 
                    <a href="https://github.com/raghuwanshi313" style="color: #58a6ff;">GitHub</a> or connect with me on 
                    <a href="https://linkedin.com/in/aman-raghuwanshi-23bcs021" style="color: #58a6ff;">LinkedIn</a>.
                </p>
                <p style="color: #c9d1d9;">
                    Best regards,<br/>
                    <strong style="color: #58a6ff;">Aman Raghuwanshi</strong>
                </p>
                <hr style="border: none; border-top: 1px solid #30363d; margin: 20px 0;" />
                <p style="color: #8b949e; font-size: 12px; margin: 0;">
                    This is an automated reply. Please do not reply to this email directly.
                </p>
            </div>
        `,
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(senderMailOptions);

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, 'Message sent successfully! I will get back to you soon.')
        );
});
