import mongoose from 'mongoose';
import { IWishlist, IWishlistItem, IWishlistOptions } from './IWishlist.js';

export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt: Date;
    username?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    avatar?: string;
    friends?: mongoose.Types.ObjectId[];
    verify(password: string): Promise<boolean>;
    createWishlist(options: IWishlistOptions): Promise<IWishlist>;
}