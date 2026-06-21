import { useState, useEffect } from 'react';
import { getAllProjects, type Project } from '../api/projects';

/**
 * Custom hook to fetch all projects
 * Usage: const { projects, loading, error, refetch } = useProjects();
 */
export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllProjects();
            setProjects(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        loading,
        error,
        refetch: fetchProjects,
    };
};
