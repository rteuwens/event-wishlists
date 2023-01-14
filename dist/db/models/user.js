import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        auto: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Use a regular expression to validate the email format
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    friends: {
        type: [mongoose.Types.ObjectId],
        required: false,
    },
}, {
    versionKey: false,
});
// Hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password'))
            return next();
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
const User = mongoose.model('User', userSchema);
export default User;
