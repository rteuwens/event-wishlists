import mongoose from 'mongoose';
import * as argon2 from 'argon2';

import { IUser } from './../../interfaces/IUser.js';
import { IWishlist, IWishlistOptions } from './../../interfaces/IWishlist.js';
import { Wishlist } from './wishlist.js';


function passwordValidator(value: string) {
    const has_digit = /\d/.test(value);
    const has_uppercase = /[A-Z]/.test(value);
    const has_lowercase = /[a-z]/.test(value);
    const is_long_enough = value.length >= 10;

    if (has_digit && has_uppercase && has_lowercase && is_long_enough) {
        return true;
    }
    return 'Password should contain at least one number, one uppercase letter, one lowercase letter, and be at least 10 characters long.'
}

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true,
            auto: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Use a regular expression to validate the email format
            match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Email address invalid.']
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: passwordValidator,
                message: (props: mongoose.Error.ValidatorError) => props.value
            }
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        userName: {
            type: String,
            required: false,
            match: [/^[a-zA-Z0-9]+$/, 'is invalid']
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
UserSchema.pre<IUser>('save', async function (this: IUser) {
    if (!this.isModified('password')) return;
    this.password = await argon2.hash(this.password);
});

UserSchema.methods.verify = async function (password: string) {
    return await argon2.verify(this.password, password);
};

UserSchema.methods.createWishlist = async function(options: IWishlistOptions) {
    const wishlist = new Wishlist({
        creator: this._id,
      ...options,
    });
  
    await wishlist.save();
    return wishlist;
};

export default mongoose.model<IUser>('User', UserSchema);
