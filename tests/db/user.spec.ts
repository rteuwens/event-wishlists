import mongoose from 'mongoose';
import User from '../../src/db/models/user';
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();


describe('User Model', () => {

    const userData = {
        email: 'test@example.com',
        password: 'testpassword',
    };

    beforeAll(async () => {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.TEST_MONGO_URL!, (err) => {
            if (err) {
                console.error(chalk.red('Error connecting to the database: ${err}'));
            } else {
                console.log(chalk.green('Successfully connected to the database'));
            }
        });
        const user = new User(userData);
        await user.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should have created a new user', async () => {
        const user = await User.findOne({ email: 'test@example.com' });
        expect(user).toBeInstanceOf(User);
        expect(user?.email).toBe(userData.email);
    });

    it('should not allow duplicate email addresses', async () => {
        const duplicateUser = new User(userData);
        try {
            await duplicateUser.save();
        } catch (error) {
            expect(error.name).toEqual('MongoServerError');
            expect(error.code).toEqual(11000);
        }
    });

    it('should reject invalid email addresses', async () => {
        const user = new User({
            email: 'testexample.com',
            password: 'ThisIsaVal1dPassword',
        });
        try {
            await user.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });

    it('should reject invalid passwords', async () => {
        const user = new User({
            email: 'faulypassword@example.com',
            password: 'testpassword',
        });
        try {
            await user.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });

    it('should have a hashed password', async () => {
        const user = await User.findOne({ email: userData.email });
        expect(user?.password).not.toBe(userData.password);
    });

    it('should correctly match password to log in', async () => {
        const user = await User.findOne({ email: userData.email });
        const match = await user?.verify(userData.password)
        expect(match).toBeTruthy;
    });

});
