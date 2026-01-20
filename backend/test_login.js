import axios from 'axios';

const testLogin = async () => {
    try {
        const response = await axios.post('http://192.168.1.77:5001/api/auth/login', {
            email: 'nurse@sutra.com',
            password: 'password123'
        });
        console.log('Success!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Response:', error.response?.data);
    }
};

testLogin();
