// import nodeMailer from "nodemailer";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  "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"
);

export const sendEmail = async (options) => {
  //   const transporter = nodeMailer.createTransport({
  //     host: process.env.SMPT_HOST,
  //     port: process.env.SMPT_PORT,
  //     service: process.env.SMPT_SERVICE,
  //     auth: {
  //       user: process.env.SMPT_MAIL,
  //       pass: process.env.SMPT_PASSWORD,
  //     },
  //   });
  //   const mailOptions = {
  //     from: process.env.SMPT_MAIL,
  //     to: options.email,
  //     subject: options.subject,
  //     text: options.message,
  //   };

  //   await transporter.sendMail(mailOptions);

  await sgMail.send({
    to: options.email,
    from: process.env.SMPT_MAIL,
    subject: options.subject,
    text: options.message,
    // html: `<a href="http://localhost:3000/reset-password/${id}">Click here</a>`,
  });
};
