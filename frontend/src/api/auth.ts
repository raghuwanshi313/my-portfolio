// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Auth API endpoints
const AUTH_API = `${API_BASE_URL}/auth`;

// API Response type
export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

// User type
export interface User {
    _id: string;
    name: string;
    email: string;
    googleId: string;
    profilePicture?: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Initiate Google OAuth login
 * Redirects to backend which then redirects to Google
 */
export const loginWithGoogle = (): void => {
    window.location.href = `${AUTH_API}/google`;
};

/**
 * Get current authenticated user
 * Requires authentication cookies
 */
export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const response = await fetch(`${AUTH_API}/current-user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return null;
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

/**
 * Logout user
 * Requires authentication cookies
 */
export const logout = async (): Promise<void> => {
    try {
        const response = await fetch(`${AUTH_API}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to logout');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

/**
 * Refresh access token
 * Uses refresh token from cookies
 */
export const refreshAccessToken = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${AUTH_API}/refresh-token`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
};
