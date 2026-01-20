import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const ScannerScreen = ({ navigation }) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        // Camera permissions are still loading
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = ({ data }) => {
        if (scanned) return;
        setScanned(true);
        // data is the Patient ID (e.g., PAT-833352474)
        navigation.navigate('PatientProfile', { patientId: data });
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={handleBarCodeScanned}
            />
            <View style={styles.overlay}>
                <Text style={styles.instruction}>Scan Patient QR Code</Text>
                <View style={styles.scanFrame} />
            </View>
            {scanned && (
                <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
                    <Text style={styles.rescanText}>Tap to Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: '#fff',
    },
    permissionButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignSelf: 'center',
    },
    permissionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    instruction: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        top: 50,
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: '#3498db',
        backgroundColor: 'transparent',
    },
    rescanButton: {
        position: 'absolute',
        bottom: 50,
        left: '20%',
        right: '20%',
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    rescanText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ScannerScreen;
