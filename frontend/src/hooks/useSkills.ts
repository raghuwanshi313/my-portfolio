import { useState, useEffect } from 'react';
import { getSkills, type Skills } from '../api/skills';

export const useSkills = () => {
    const [skills, setSkills] = useState<Skills>({
        programming_languages: [],
        frontend: [],
        backend: [],
        databases: [],
        dev_tools: [],
        other: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSkills = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getSkills();
            setSkills(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch skills');
            console.error('Error fetching skills:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const refetch = () => {
        fetchSkills();
    };

    return {
        skills,
        loading,
        error,
        refetch,
    };
};
