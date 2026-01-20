import mongoose from 'mongoose';
import User from '../models/User.js';

const checkUsers = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sutra');
        const users = await User.find({});
        console.log('--- USERS DUMP START ---');
        console.log(JSON.stringify(users, null, 2));
        console.log('--- USERS DUMP END ---');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUsers();
