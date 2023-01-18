import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../../src/db/models/user';
import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });


describe('User Model', () => {

    const userData = {
        email: 'test@example.com',
        password: 'testpassword',
    };

    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        const user = new User(userData);
        await user.save();
    });
    
    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close();
    });

    it('should have created a new user', async () => {
        const user = await User.findOne({ email: 'test@example.com' });
        expect(user).toBeInstanceOf(User);
        expect(user.email).toBe(userData.email);
    });

    it('should have a hashed password', async () => {
        const user = await User.findOne({ email: userData.email });
        expect(user.password).not.toBe(userData.password);
    });

    it('should have a createdAt field with a valid date', async () => {
        const user = await User.findOne({ email: userData.email });
        expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should correctly match password to log in', async () => {
        const user = await User.findOne({ email: userData.email });
        const match = await bcrypt.compare(userData.password, user.password)
        expect(match).toBeTruthy
    });
});
