import { useState, useEffect } from 'react';
import { getPersonalInfo, type PersonalInfo } from '../api/personalInfo';

export const usePersonalInfo = () => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPersonalInfo = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPersonalInfo();
            setPersonalInfo(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch personal info');
            console.error('Error fetching personal info:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonalInfo();
    }, []);

    const refetch = () => {
        fetchPersonalInfo();
    };

    return {
        personalInfo,
        loading,
        error,
        refetch,
    };
};
