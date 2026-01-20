import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const listAdmins = async () => {
    try {
        await mongoose.connect("mongodb+srv://dhakalsaurav6_db_user:sutra@sutra-cluster.i2xnkps.mongodb.net/?appName=sutra-cluster");
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const users = await db.collection('users').find({ role: 'admin' }).toArray();

        if (users.length === 0) {
            console.log('No admins found');
        } else {
            console.log('Admins:');
            users.forEach(admin => {
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
