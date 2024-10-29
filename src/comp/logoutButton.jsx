import React from 'react';
import config from '../appConfig.json'

const baseUrl = config.baseURL

const LogoutButton = (p) => {
    const handleLogout = async () => {
        try {
            const response = await fetch(baseUrl+'/auth/logout', {
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

    // Inline styles for the button
    const styles = {
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007bff', // Bootstrap primary color
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            outline: 'none',
            margin:"auto",
            display:"block"
        },
    };

    return (
        <button style={styles.button} onClick={handleLogout}>
            {p.content} →
        </button>
    );
};

export default LogoutButton;
