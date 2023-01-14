import mongoose from 'mongoose';
import User from '../../src/db/models/user';
import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });


describe('User Model', () => {
    // Connect to the test database before running the tests
    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
    });

    // Clear all test data after running the tests
    afterEach(async () => {
        await User.deleteMany({});
    });

    // Close the connection to the test database after all tests have run
    afterAll(async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'testpassword',
        };
        const user = new User(userData);
        await user.save();
        const users = await User.find({ email: 'test@example.com' });
        expect(users.length).toBe(1);
        expect(users[0].email).toBe(userData.email);
    });

    it('should hash the password before saving the user', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'testpassword',
        };
        const user = new User(userData);
        await user.save();
        const users = await User.find({ email: 'test@example.com' });
        expect(users[0].password).not.toBe(userData.password);
    });
});
