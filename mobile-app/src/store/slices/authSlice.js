import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import config from '../../config';

const API_URL = config.API_URL;

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        console.log('Attempting login to:', `${API_URL}/auth/login`);
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        console.log('Login response:', response.data);
        await SecureStore.setItemAsync('token', response.data.token);
        await SecureStore.setItemAsync('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error message:', error.message);
        return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            SecureStore.deleteItemAsync('token');
            SecureStore.deleteItemAsync('user');
        },
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
            });
    },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
