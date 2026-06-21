import { useState, useEffect } from 'react';
import { getAllExperiences, type Experience } from '../api/experiences';

export const useExperiences = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllExperiences();
            setExperiences(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch experiences');
            console.error('Error fetching experiences:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const refetch = () => {
        fetchExperiences();
    };

    return {
        experiences,
        loading,
        error,
        refetch,
    };
};
