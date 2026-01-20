import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as db from '../database/db';
import config from '../config';

const API_URL = config.API_URL;

const PatientProfileScreen = ({ route, navigation }) => {
    const { patientId } = route.params;
    const { user, token } = useSelector((state) => state.auth);
    const [patient, setPatient] = useState(null);
    const [encounters, setEncounters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatientData();
    }, [patientId]);

    const fetchPatientData = async () => {
        try {
            // 1. Fetch Patient Details
            const pRes = await axios.get(`${API_URL}/patients/${patientId}`);
            setPatient(pRes.data);
            db.savePatient(pRes.data); // Cache for offline

            // 2. Fetch Encounters (Backend handles role-based filtering)
            const eRes = await axios.get(`${API_URL}/encounters/patient/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEncounters(eRes.data);
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert('Offline Mode', 'Loading cached data...');
            // Load from local DB if offline
            const localPatients = db.getPatients();
            const localP = localPatients.find(p => p.id === patientId);
            if (localP) {
                // Map SQLite 'id' back to 'uniqueId' for consistent rendering
                setPatient({ ...localP, uniqueId: localP.id });
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#3498db" />;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{patient?.name}</Text>
                <Text style={styles.id}>{patient?.uniqueId}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Demographics</Text>
                <Text>Age: {patient?.age}</Text>
                <Text>Gender: {patient?.gender}</Text>
                <Text>Contact: {patient?.contact}</Text>
                <Text>Address: {patient?.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>History (Role: {user?.role})</Text>
                {encounters.length === 0 ? (
                    <Text style={styles.noData}>No records found or not authorized.</Text>
                ) : (
                    encounters.map((e, idx) => (
                        <View key={idx} style={styles.encounterCard}>
                            <Text style={styles.encounterType}>{e.type}</Text>
                            <Text style={styles.encounterDate}>{new Date(e.createdAt).toLocaleDateString()}</Text>
                            {Object.entries(e.data).map(([key, value]) => (
                                <Text key={key}>{key}: {value}</Text>
                            ))}
                            <Text style={styles.provider}>By: {e.provider?.name}</Text>
                        </View>
                    ))
                )}
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEncounter', { patientId })}
            >
                <Text style={styles.addButtonText}>Add Encounter</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa' },
    header: { padding: 25, backgroundColor: '#2c3e50', alignItems: 'center' },
    name: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
    id: { fontSize: 16, color: '#bdc3c7', marginTop: 5 },
    section: { padding: 20, backgroundColor: '#fff', marginVertical: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#34495e' },
    encounterCard: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    encounterType: { fontWeight: 'bold', color: '#2980b9' },
    encounterDate: { fontSize: 12, color: '#95a5a6', marginBottom: 5 },
    provider: { fontSize: 12, fontStyle: 'italic', marginTop: 5, color: '#7f8c8d' },
    addButton: { margin: 20, backgroundColor: '#27ae60', padding: 15, borderRadius: 8, alignItems: 'center' },
    addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    noData: { color: '#95a5a6', fontStyle: 'italic' }
});

export default PatientProfileScreen;
