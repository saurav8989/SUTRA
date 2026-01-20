import axios from 'axios';
import * as db from '../database/db';
import NetInfo from '@react-native-community/netinfo';
import config from '../config';

const API_URL = config.API_URL;

export const syncEncounters = async (token) => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) return;

    const pendingEncounters = db.getPendingEncounters();
    if (pendingEncounters.length === 0) return;

    for (const encounter of pendingEncounters) {
        try {
            await axios.post(
                `${API_URL}/encounters`,
                {
                    patient: encounter.patientId,
                    type: encounter.type,
                    data: JSON.parse(encounter.data),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            db.markEncounterSynced(encounter.id);
        } catch (error) {
            console.error('Failed to sync encounter:', encounter.id, error);
        }
    }
};
