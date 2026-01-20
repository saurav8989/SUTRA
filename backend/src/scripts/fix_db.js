
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        const collection = connection.db.collection('patients');

        console.log('--- List of Current Indexes ---');
        const indexes = await collection.indexes();
        console.log(JSON.stringify(indexes, null, 2));

        const hasPatientIdIndex = indexes.some(idx => idx.name === 'patientId_1');

        if (hasPatientIdIndex) {
            console.log('Dropping patientId_1 index...');
            await collection.dropIndex('patientId_1');
            console.log('Successfully dropped patientId_1 index.');
        } else {
            console.log('patientId_1 index not found.');
        }

        console.log('\n--- Final Indexes ---');
        const finalIndexes = await collection.indexes();
        console.log(JSON.stringify(finalIndexes, null, 2));

        process.exit();
    } catch (error) {
        console.error('Error during DB fix:', error);
        process.exit(1);
    }
};

fixDB();
