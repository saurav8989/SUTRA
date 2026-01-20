
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, 'name email role password');
        users.forEach(u => {
            console.log(`Email: ${u.email}`);
            console.log(`Hash: ${u.password}`);
            console.log('---');
        });
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listUsers();
