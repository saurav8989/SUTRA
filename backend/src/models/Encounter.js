import mongoose from 'mongoose';

const encounterSchema = mongoose.Schema({
    patient: {
        type: String, // Patient Unique ID (e.g., PAT-833352474)
        required: true,
        ref: 'Patient'
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['Demographics', 'Vitals', 'Immunization', 'Clinical', 'Administrative'],
    },
    data: {
        type: Map,
        of: String,
        required: true
    },
    syncStatus: {
        type: String,
        enum: ['synced', 'pending'],
        default: 'synced'
    }
}, {
    timestamps: true,
});

const Encounter = mongoose.model('Encounter', encounterSchema);

export default Encounter;
