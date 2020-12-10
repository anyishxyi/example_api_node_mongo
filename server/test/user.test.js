require('dotenv').config();
import mongoose from 'mongoose';
import User from '../models/user';
const userData = { "email": "test@test.me", "password": "testtesttest" }

describe('User Model Test', () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
		});
	});

	it('create & save user successfully', async () => {
		const validUser = new UserModel(userData);
		const savedUser = await validUser.save();

		expect(savedUser._id).toBeDefined();
		expect(savedUser.name).toBe(userData.name);
		expect(savedUser.gender).toBe(userData.gender);
		expect(savedUser.dob).toBe(userData.dob);
		expect(savedUser.loginUsing).toBe(userData.loginUsing);
	});
})