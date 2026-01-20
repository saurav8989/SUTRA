import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ path: '../../.env' });

const listAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const admins = await User.find({ role: 'admin' });
        if (admins.length === 0) {
            console.log('No admins found');
        } else {
            console.log('Admins:');
            admins.forEach(admin => {
                console.log(`- ${admin.email}`);
            });
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

listAdmins();
