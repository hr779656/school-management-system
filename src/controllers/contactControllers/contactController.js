const { prisma } = require('../../DB/dbConfig');
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler');
const nodemailer = require('nodemailer')
require("dotenv").config()

const userCotacts = asyncHandler(async (req, res, next) => {

    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
        return next(new ErrorHandler('Please fill all required fields', 400));
    }

    const response = await prisma.contact.create({
        data: {
            name,
            email,
            subject,
            message
        }
    })
    if (!response) {
        return next(new ErrorHandler('Unable to add message!', 400));
    }
    return res.status(200).json({ message: "Message send successfully" })

});


const AdminSendMail = asyncHandler(async (req, res, next) => {

    const { email, Subject, f_Para, S_Para, T_Para, four_Para, fifth_para } = req.body

    if (!email || !Subject || !f_Para || !S_Para || !T_Para || !four_Para || !fifth_para) {
        return next(new ErrorHandler('Please fill all required fields', 400));
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.AUTH,
        to: email,
        subject: Subject,
        html: `
            <p>${f_Para}</p>
            <p>${S_Para}</p>
            <p>${T_Para}</p>
            <p>${four_Para}</p>
            <p>${fifth_para}</p>
        `
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            next(new ErrorHandler('Email not send', 400))

        }
        else {
            res.json({ msg: "Send Email Successfull...!" })
        }
    })

})


const allContacts = asyncHandler(async (req, res, next) => {
    const contacts = await prisma.contact.findMany()

    if (!contacts) {
        return next(new ErrorHandler('not found', 404))
    }

    return res.json({ data: contacts })
})

module.exports = { userCotacts, AdminSendMail, allContacts };
