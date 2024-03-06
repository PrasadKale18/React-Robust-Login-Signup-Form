const express = require('express')
const router = express.Router()
const UserService = require('../service/user.service')
const UserModel = require('../model/user.schema')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const app = require('../service/user.service')
const bcrypt = require('bcrypt')

//Signup 
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body

        const emailExists = await UserService.emailExists(email);
        if (emailExists) {
            return res.status(400).json({
                status: 400,
                success: false,
                data: undefined,
                message: 'Email already exists!'
            });
        }
        const result = await UserService.signup(username, email, password)
        res.send({
            status: 200,
            success: true,
            data: result,
            message: "Signup Successfully!"
        })
    } catch (error) {
        res.send({
            status: 400,
            success: false,
            data: undefined,
            message: "Invalid Server Error!"
        })
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await UserService.login(email, password)
        const token = jwt.sign({ username: result.username }, 'secret', { expiresIn: "1h" })
        res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
        if (result) {
            res.send({
                status: 200,
                success: true,
                data: result, token,
                message: 'login successfully'
            });
        } else {
            res.send({
                status: 401,
                success: false,
                data: undefined,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        res.send({
            status: 400,
            success: false,
            data: undefined,
            message: "Invalid email or password!"
        })
    }
});

//Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                data: undefined,
                message: 'User not exists!'
            });
        }

        //JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });

        const resetPasswordLink = `http://localhost:3000/reset-password/${token}`;

        // Call function to send email
        await sendResetPasswordEmail(user.email, resetPasswordLink);

        res.status(200).json({
            status: 200,
            success: true,
            data: undefined,
            message: 'Reset password email sent successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            success: false,
            data: undefined,
            message: 'Internal Server Error'
        });
    }
});

//Reset Password
router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Verify the JWT token
        const decodedToken = jwt.verify(token, 'secret');

        // Redirect to the reset password page on the frontend
        res.redirect(`http://localhost:3000/reset-password/${token}`);
    } catch (error) {
        console.error(error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 401,
                success: false,
                data: undefined,
                message: 'Token expired. Please request a new password reset.'
            });
        }

        res.status(500).json({
            status: 500,
            success: false,
            data: undefined,
            message: 'Internal Server Error'
        });
    }
});



router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decodedToken = jwt.verify(token, 'secret');
        const id = decodedToken.id;

        // Use bcrypt to hash the new password
        const hashPassword = await bcrypt.hash(password, 10);

        // Update user's password in the database
        await UserModel.findByIdAndUpdate({ _id: id }, { password: hashPassword });

        res.json({
            status: true,
            message: 'Password updated successfully!'
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: false,
                message: 'Token expired. Please request a new password reset.'
            });
        }
        res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ status: true })
})


// Function to send reset password email
async function sendResetPasswordEmail(email, resetPasswordLink) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email-Id',
                pass: 'your-email-Id-password'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'your-email-Id',
            to: email,
            subject: 'Reset Password',
            html: `<p>Click the following link to reset your password:</p><p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Reset password email sent:', info.response);
    } catch (error) {
        console.error('Error sending reset password email:', error);
        throw error; 
    }
}


module.exports = router






