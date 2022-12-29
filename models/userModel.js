const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        unique: [true, 'A user must have a unique name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A user must have email'],
        unique: [true, 'A user must have a unique email! please provide another email'],
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minLength: [8, 'Your password must be at least 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (el) {
                if(this.password === el){
                    return true;
                }else{
                return false;
                }
            },
            message: 'your password and password confirm are not the same'
        }
    },
    passwordResetToken: String,
    passwordResetExpires: Date
})


userSchema.pre('save',async function(next) {
    // if the password is not modified go the next middleware
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async (candidatePasswod, password) => {
    return await bcrypt.compare(candidatePasswod, password);
};

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;