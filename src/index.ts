import mongoose from 'mongoose';
import User from './db/models/user.js';
import * as dotenv from "dotenv";
dotenv.config();


// Connect to the MongoDB database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL!, (err) => {
    if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'Error connecting to the database: ${err}');
    } else {
        console.log('\x1b[32m%s\x1b[0m', 'Successfully connected to the database');
    }
});


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
