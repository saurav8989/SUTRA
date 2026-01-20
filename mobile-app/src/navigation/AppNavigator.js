import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/LoginScreen';
import ScannerScreen from '../screens/ScannerScreen';
import PatientProfileScreen from '../screens/PatientProfileScreen';
import AddEncounterScreen from '../screens/AddEncounterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { token } = useSelector((state) => state.auth);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {token == null ? (
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                ) : (
                    <>
                        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Scan Patient' }} />
                        <Stack.Screen name="PatientProfile" component={PatientProfileScreen} options={{ title: 'Patient Profile' }} />
                        <Stack.Screen name="AddEncounter" component={AddEncounterScreen} options={{ title: 'New Encounter' }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
