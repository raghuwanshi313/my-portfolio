import { useState, useEffect } from 'react';
import { getAllCodingProfiles, type CodingProfile } from '../api/codingProfiles';

export const useCodingProfiles = () => {
    const [codingProfiles, setCodingProfiles] = useState<CodingProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCodingProfiles = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllCodingProfiles();
            setCodingProfiles(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch coding profiles');
            console.error('Error fetching coding profiles:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCodingProfiles();
    }, []);

    const refetch = () => {
        fetchCodingProfiles();
    };

    return {
        codingProfiles,
        loading,
        error,
        refetch,
    };
};
