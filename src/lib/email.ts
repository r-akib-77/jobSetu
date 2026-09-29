import nodemailer from "nodemailer";

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

if (!gmailUser || !gmailAppPassword) {
  throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD must be configured");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
});

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const info = await transporter.sendMail({
      from: `"JobSetu" <${gmailUser}>`,
      to: email,
      subject: "Your JobSetu verification code",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 0 auto;
            padding: 24px;
            background: #ffffff;
          "
        >
          <h2
            style="
              color: #0f172a;
              margin-bottom: 12px;
            "
          >
            Verify your JobSetu account
          </h2>

          <p
            style="
              color: #475569;
              line-height: 1.6;
            "
          >
            Use the verification code below to
            verify your email address.
          </p>

          <div
            style="
              margin: 24px 0;
              padding: 20px;
              background: #f8fafc;
              border-radius: 12px;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #2563eb;
            "
          >
            ${otp}
          </div>

          <p
            style="
              color: #475569;
              line-height: 1.6;
            "
          >
            This verification code will expire
            in 10 minutes.
          </p>

          <p
            style="
              color: #64748b;
              font-size: 14px;
              margin-top: 24px;
            "
          >
            If you didn't create a JobSetu account,
            you can safely ignore this email.
          </p>

          <hr
            style="
              border: none;
              border-top: 1px solid #e2e8f0;
              margin: 24px 0;
            "
          />

          <p
            style="
              color: #94a3b8;
              font-size: 12px;
            "
          >
            © ${new Date().getFullYear()} JobSetu
          </p>
        </div>
      `,
    });

    console.log("Verification email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Nodemailer error:", error);

    throw new Error("Failed to send verification email");
  }
}
