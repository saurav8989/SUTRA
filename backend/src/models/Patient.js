import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    medicalHistory: {
        type: [String], // Array of strings for simplicity
        default: [],
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true,
    },
    qrData: {
        type: String, // Stringified JSON or encoded token
    }
}, {
    timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
