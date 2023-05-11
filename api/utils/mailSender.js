import nodemailer from "nodemailer"
import * as dotenv from "dotenv"
import mailgen from "mailgen"
dotenv.config()

// configure nodemailer
let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// configure mailgen
let mailGenerator = new mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const sendMail = async (email, name, text) => {
    try {
        let emailcontent = {
          body: {
            name: name,
            intro:
              "Welcome to Our Hotel! We're very excited to have you on here.",
            outro:
              "Need help, or have questions? Just reply to this email, we'd love to help.",
          },
        };

        let emailBody = mailGenerator.generate(emailcontent)

        transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Booking Successful",
            text: text,
            html: emailBody
        })

        return Promise.resolve("We have sent you an Email")
    } catch (error) {
        return Promise.reject(error)
    }

}