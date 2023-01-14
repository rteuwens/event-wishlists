import mongoose from 'mongoose';
import User from './db/models/user.js';
import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


// Connect to the MongoDB database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);

const createUsers = async () => {
    // Create a new user
    const billy = new User({
        email: 'billy@example.com',
        password: 'mypassword',
        firstName: 'Billy',
        lastName: 'Smith',
        dateOfBirth: new Date('1990-01-01'),
    });

    // Save the user to the database
    await billy.save();

    // Create another user
    const bob = new User({
        email: 'bob@example.com',
        password: 'mypassword',
        firstName: 'Bob',
        lastName: 'Johnson',
        dateOfBirth: new Date('1995-01-01'),
    });

    // Save the user to the database
    await bob.save();
};

createUsers();
