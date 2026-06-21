const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const EXPERIENCES_API = `${API_BASE_URL}/experiences`;

export interface Experience {
    _id: string;
    company_name: string;
    company_logo?: string;
    role: string;
    location?: string;
    joining_date: string;
    leaving_date?: string;
    is_current: boolean;
    description: string;
    achievements: string[];
    tech_stack: string[];
    createdAt: string;
    updatedAt: string;
}

export const getAllExperiences = async (): Promise<Experience[]> => {
    const response = await fetch(EXPERIENCES_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch experiences');
    }

    const data = await response.json();
    return data.data;
};

export const getExperienceById = async (id: string): Promise<Experience> => {
    const response = await fetch(`${EXPERIENCES_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch experience');
    }

    const data = await response.json();
    return data.data;
};

export const createExperience = async (formData: FormData): Promise<Experience> => {
    const response = await fetch(EXPERIENCES_API, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to create experience');
    }

    const data = await response.json();
    return data.data;
};

export const updateExperience = async (id: string, formData: FormData): Promise<Experience> => {
    const response = await fetch(`${EXPERIENCES_API}/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to update experience');
    }

    const data = await response.json();
    return data.data;
};

export const deleteExperience = async (id: string): Promise<void> => {
    const response = await fetch(`${EXPERIENCES_API}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to delete experience');
    }
};
