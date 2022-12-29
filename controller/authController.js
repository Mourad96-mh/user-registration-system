const jwt = require('jsonwebtoken');

const UserModel = require('./../models/userModel');


exports.signup = async (req, res, next) => {
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    const token = jwt.sign({userId: user._id}, 'My_SECRET_STRING_TOKEN_IS_MOURAD', {
        expiresIn: 90
    })
    // res.status(201).json({
    //     status: 'success',
    //     data: {
    //         user
    //     },
    //     token
    // })
    res.render('login');
};


exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            status: 'fail',
            message: 'Please complete both the email and password field'
        })
    }
    // find the user based on email
    const user = await UserModel.findOne({ email}).select('+password');
    if(!user){
        return res.status(404).json({
            status: 'fail',
            message: 'the email address doesent belogning to any user'
        })
    }
    const correctPassword = user.correctPassword(password, user.password);
    if(!correctPassword){
        return res.status(401).json({
            status: 'fail',
            message: 'Your password is incorrect, Please provide a correct password'
        })
    }
    // the user is authorized so send a token to him
    const token = jwt.sign({userId: user._id}, 'My_SECRET_STRING_TOKEN_IS_MOURAD', {
        expiresIn: 90
    })
    // res.status(200).json({
    //     status: 'succes',
    //     data: {
    //         user
    //     },
    //     token
    // })
    res.render('home', {user});
}
