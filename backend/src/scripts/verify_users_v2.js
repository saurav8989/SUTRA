import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import fs from 'fs';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});
        let output = '--- USERS IN DATABASE ---\n';
        users.forEach(u => {
            output += `- ${u.email} (${u.role})\n`;
        });
        output += '--- END ---';
        fs.writeFileSync('users_check.txt', output);
        console.log('Results written to users_check.txt');
        process.exit();
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
};

checkUsers();
