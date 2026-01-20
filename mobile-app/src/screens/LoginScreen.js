import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        dispatch(login({ email, password }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SUTRA</Text>
            <Text style={styles.subtitle}>Healthcare Provider Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f7fa',
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#dcdde1',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#e74c3c',
        marginTop: 15,
        textAlign: 'center',
    },
});

export default LoginScreen;
