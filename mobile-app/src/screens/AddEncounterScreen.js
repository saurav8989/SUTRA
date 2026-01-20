import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as db from '../database/db';
import { syncEncounters } from '../services/syncService';
import config from '../config';

const API_URL = config.API_URL;

const AddEncounterScreen = ({ route, navigation }) => {
    const { patientId } = route.params;
    const { user, token } = useSelector((state) => state.auth);
    const [type, setType] = useState('Clinical');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    // Simple form fields based on role/type
    const renderFields = () => {
        if (user.role === 'nurse') {
            return (
                <>
                    <Text style={styles.label}>Temperature (°C)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" onChangeText={(v) => setData({ ...data, temp: v })} />
                    <Text style={styles.label}>Blood Pressure</Text>
                    <TextInput style={styles.input} placeholder="120/80" onChangeText={(v) => setData({ ...data, bp: v })} />
                    <Text style={styles.label}>Weight (kg)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" onChangeText={(v) => setData({ ...data, weight: v })} />
                </>
            );
        }
        return (
            <>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    multiline
                    onChangeText={(v) => setData({ ...data, notes: v })}
                />
            </>
        );
    };

    const handleSubmit = async () => {
        if (Object.keys(data).length === 0) {
            Alert.alert('Error', 'Please fill in at least one field');
            return;
        }

        setLoading(true);
        try {
            // 1. Try online first
            await axios.post(`${API_URL}/encounters`, {
                patient: patientId,
                type: user.role === 'nurse' ? 'Vitals' : 'Clinical',
                data: data
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Success', 'Encounter saved online');
        } catch (error) {
            // 2. Fallback to offline
            db.saveEncounter(patientId, user.role === 'nurse' ? 'Vitals' : 'Clinical', data);
            Alert.alert('Offline', 'Encounter saved locally. Will sync when online.');
        } finally {
            setLoading(false);
            navigation.goBack();
            syncEncounters(token); // Background sync attempt
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add New Encounter</Text>
            <Text style={styles.patientId}>Patient: {patientId}</Text>

            <View style={styles.form}>
                {renderFields()}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Save Encounter</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f7fa' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5 },
    patientId: { fontSize: 16, color: '#7f8c8d', marginBottom: 30 },
    form: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#34495e', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#dcdde1', borderRadius: 5, padding: 10, marginBottom: 20 },
    submitButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 5, alignItems: 'center' },
    submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default AddEncounterScreen;
