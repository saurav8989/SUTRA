import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const checkUsers = async () => {
    try {
        await mongoose.connect("mongodb+srv://dhakalsaurav6_db_user:sutra@sutra-cluster.i2xnkps.mongodb.net/?appName=sutra-cluster");
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const users = await db.collection('users').find({}).toArray();

        if (users.length === 0) {
            console.log('No users found in the database.');
        } else {
            console.log('Available Users:');
            users.forEach(u => {
                console.log(`- Email: ${u.email} | Role: ${u.role}`);
            });
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
