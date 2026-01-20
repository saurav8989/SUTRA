import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGO_URI = "mongodb+srv://dhakalsaurav6_db_user:sutra@sutra-cluster.i2xnkps.mongodb.net/?appName=sutra-cluster";

const createTestUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const usersCol = db.collection('users');

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        const testUsers = [
            { name: 'Admin User', email: 'admin@sutra.com', password, role: 'admin' },
            { name: 'Nurse Joy', email: 'nurse@sutra.com', password, role: 'nurse' },
            { name: 'Dr. Strange', email: 'doctor@sutra.com', password, role: 'doctor' },
            { name: 'Staff Member', email: 'staff@sutra.com', password, role: 'staff' },
        ];

        for (const user of testUsers) {
            const exists = await usersCol.findOne({ email: user.email });
            if (!exists) {
                await usersCol.insertOne(user);
                console.log(`Created: ${user.email} (${user.role})`);
            } else {
                await usersCol.updateOne({ email: user.email }, { $set: { password: user.password } });
                console.log(`Updated Password for: ${user.email}`);
            }
        }

        console.log('\nAll test users are ready!');
        console.log('Password for all: password123');
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTestUsers();
