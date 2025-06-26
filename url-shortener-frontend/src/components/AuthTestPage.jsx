import React, { useState } from 'react';
import api from '../api/api';
import { useStoreContext } from '../contextApi/ContextApi';

const AuthTestPage = () => {
    const [testResult, setTestResult] = useState('');
    const { token } = useStoreContext();

    const testBackend = async () => {
        try {
            const response = await api.get('/api/auth/test');
            setTestResult(`PASS Backend Test: ${response.data}`);
        } catch (error) {
            setTestResult(`FAIL Backend Test Failed: ${error.message}`);
        }
    };

    const testRegister = async () => {
        try {
            const testUser = {
                username: 'testuser123',
                email: 'test@example.com',
                password: 'password123'
            };
            
            const response = await api.post('/api/auth/register', testUser);
            setTestResult(`PASS Register Test: ${response.data}`);
        } catch (error) {
            setTestResult(`FAIL Register Test Failed: ${error.response?.data || error.message}`);
        }
    };

    const testLogin = async () => {
        try {
            const loginData = {
                username: 'testuser123',
                password: 'password123'
            };
            
            const response = await api.post('/api/auth/login', loginData);
            setTestResult(`PASS Login Test: Token received - ${response.data.token ? 'YES' : 'NO'}`);
        } catch (error) {
            setTestResult(`FAIL Login Test Failed: ${error.response?.data || error.message}`);
        }
    };

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
            
            <div className="mb-4">
                <strong>Current Token:</strong> {token ? 'Token exists' : 'No token'}
            </div>
            
            <div className="space-y-4">
                <button 
                    onClick={testBackend}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                >
                    Test Backend Connection
                </button>
                
                <button 
                    onClick={testRegister}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                >
                    Test Registration
                </button>
                
                <button 
                    onClick={testLogin}
                    className="bg-purple-500 text-white px-4 py-2 rounded mr-4"
                >
                    Test Login
                </button>
            </div>
            
            <div className="mt-8 p-4 bg-gray-100 rounded">
                <h2 className="font-bold mb-2">Test Result:</h2>
                <pre>{testResult}</pre>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
                <p>Backend URL: {import.meta.env.VITE_BACKEND_URL}</p>
                <p>Frontend URL: {import.meta.env.VITE_REACT_FRONT_END_URL}</p>
            </div>
        </div>
    );
};

export default AuthTestPage;
