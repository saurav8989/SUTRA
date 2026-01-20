
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: 'superadmin@test.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }
        user.password = '123456';
        await user.save();
        console.log('Password reset to 123456');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetPassword();
