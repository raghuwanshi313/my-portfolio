const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const PERSONAL_INFO_API = `${API_BASE_URL}/personal-info`;

export interface PersonalInfo {
    _id?: string;
    name: string;
    tagline: string;
    description: string;
    cv?: string;
    profile_image: string;
    email: string;
    phone?: string;
    location?: string;
    social_links: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        portfolio?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export const getPersonalInfo = async (): Promise<PersonalInfo> => {
    const response = await fetch(PERSONAL_INFO_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch personal info');
    }

    const data = await response.json();
    return data.data;
};

export const updatePersonalInfo = async (formData: FormData): Promise<PersonalInfo> => {
    const response = await fetch(PERSONAL_INFO_API, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to update personal info');
    }

    const data = await response.json();
    return data.data;
};

export const deletePersonalInfo = async (): Promise<void> => {
    const response = await fetch(PERSONAL_INFO_API, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to delete personal info');
    }
};
