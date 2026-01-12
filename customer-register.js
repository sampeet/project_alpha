// Customer Registration
document.getElementById('customerRegisterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };
    
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (formData.password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating Account...';
    
    try {
        const result = await api.registerCustomer(formData);
        
        // Store token and user data
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        showToast('Account created successfully!', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'customer-dashboard.html';
        }, 1500);
        
    } catch (error) {
        showToast(error.message, 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});