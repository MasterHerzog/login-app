"use server";

import transporter from "@/lib/nodemailer";
import { success } from "better-auth";
import { BiParagraph } from "react-icons/bi";

const styles = {
  container:
    "max-width:500px;margin:20px auto;padding:20px;border:1px solid #eee;border-radius:5px;box-shadow:0 2px 5px rgba(0,0,0,0.1);",
  heading: "font-size:20px;color:#333;",
  paragraph: "font-size:16px;color:#666;line-height:1.5;",
  link: "display:inline-block;margin-top:15px;padding:10px 15px;background-color:#007bff;color:#fff;border-radius:5px;text-decoration:none;",
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `BetterAuthy - ${subject}`,
    html: `
          <div style="${styles.container}">
            <h1 style="${styles.heading}">${subject}</h1>
            <p style="${styles.paragraph}">${meta.description}</p>
            <a href="${meta.link}" style="${styles.link}">Click here</a>
          </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.log("Error sending email:", err);
    return { success: false };
  }
}
