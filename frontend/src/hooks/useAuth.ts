import { useState, useEffect } from 'react';
import { getCurrentUser, type User } from '../api/auth';

/**
 * Custom hook to manage authentication state
 * Usage: const { user, loading, isAuthenticated, isAdmin, refetch } = useAuth();
 */
export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getCurrentUser();
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        refetch: fetchUser,
    };
};
