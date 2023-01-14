import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt: Date;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    avatar?: string;
    friends?: mongoose.Types.ObjectId[];
}