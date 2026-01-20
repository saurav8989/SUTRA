
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const debugDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        const indexes = await connection.db.collection('patients').indexes();
        console.log('--- INDEXES START ---');
        console.log(JSON.stringify(indexes, null, 2));
        console.log('--- INDEXES END ---');

        const patients = await connection.db.collection('patients').find({}).limit(1).toArray();
        console.log('--- SAMPLE DATA START ---');
        if (patients.length > 0) {
            console.log(Object.keys(patients[0]));
            console.log(JSON.stringify(patients[0], null, 2));
        } else {
            console.log('No patients found');
        }
        console.log('--- SAMPLE DATA END ---');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugDB();
