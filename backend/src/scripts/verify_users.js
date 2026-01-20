import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});
        console.log('--- USERS IN DATABASE ---');
        users.forEach(u => {
            console.log(`- ${u.email} (${u.role})`);
        });
        console.log('--- END ---');
        process.exit();
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
};

checkUsers();
