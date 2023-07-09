const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Every field is required'
        });
    }

    const validEmail = emailValidator.validate(email);

    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "password and confirm password doesn't match"
        });
    }

    try {
        // const result = await userModel.create(req.body);
        const userInfo = userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Account already exist with provided email address'
            })
        }
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Every field is mandatory'
        });
    }

    try {

        const user = await userModel.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password ,user.password))) {
            return res.status(400).json({
                success: false,
                message: 'invalid credentials'
            });
        }

        const token = user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            data: user,
            token : token
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

const getuser = async (req, res, next) =>{
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const logout = (req, res, next) => {
    const cookieOption = {
        expires: new Date(),
        httpOnly: true
    }
    try {
        res.cookie('token', null, cookieOption);
        res.status(200).json({
            success: true,
            message: 'Logged Out'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { signup, signin, getuser, logout };