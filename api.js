// API Configuration
const API_BASE_URL = window.location.origin + '/api';

// Helper function to get auth token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Helper function to show toast notifications
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// API Functions
const api = {
    // Auth endpoints
    registerCustomer: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }
        
        return response.json();
    },
    
    registerMechanic: async (mechanicData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register/mechanic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mechanicData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }
        
        return response.json();
    },
    
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }
        
        return response.json();
    },
    
    // Mechanic endpoints
    getMechanics: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/mechanics?${params}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch mechanics');
        }
        
        return response.json();
    },
    
    // Job endpoints
    createJob: async (jobData) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(jobData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create job');
        }
        
        return response.json();
    },
    
    getAvailableJobs: async (location = '') => {
        const token = getAuthToken();
        const params = location ? `?location=${location}` : '';
        const response = await fetch(`${API_BASE_URL}/jobs/available${params}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }
        
        return response.json();
    },
    
    acceptJob: async (jobId) => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/accept`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to accept job');
        }
        
        return response.json();
    }
};