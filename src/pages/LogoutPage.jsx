import React from 'react';

const LogoutPage = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3030/auth/logout', {
                method: 'POST',
                credentials: 'include', // Send cookies for session
            });

            if (response.ok) {
                // Handle successful logout, e.g., redirect to login page
                window.location.href = '/login'; // Redirect to login page
            } else {
                // Handle logout error
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Inline styles for centering the button
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Full viewport height
            backgroundColor: '#f0f0f0', // Light background color
        },
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007bff', // Bootstrap primary color
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            outline: 'none',
        },
    };

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default LogoutPage;
