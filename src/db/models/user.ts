import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser.js';

const userSchema = new mongoose.Schema(
    {
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
            match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email address invalid."]
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
        userName: {
            type: String,
            required: false,
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
    },
    {
        versionKey: false,
    }
);

// Hash the password before saving the user to the database
userSchema.pre<IUser>('save', async function(this: IUser, next) {
    try {
        if (!this.isModified('password')) return next();
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err: any) {
        return next(err);
    }
});


const User = mongoose.model<IUser>('User', userSchema);
export default User;
