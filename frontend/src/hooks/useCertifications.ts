import { useState, useEffect } from 'react';
import { getAllCertifications, type Certification } from '../api/certifications';

export const useCertifications = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCertifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllCertifications();
            setCertifications(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch certifications');
            console.error('Error fetching certifications:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    const refetch = () => {
        fetchCertifications();
    };

    return {
        certifications,
        loading,
        error,
        refetch,
    };
};
