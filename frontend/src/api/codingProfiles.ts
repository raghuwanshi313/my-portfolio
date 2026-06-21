const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const CODING_PROFILES_API = `${API_BASE_URL}/coding-profiles`;

export interface CodingProfile {
    _id: string;
    platform: string;
    username: string;
    profile_url: string;
    rank?: string;
    rating?: number;
    question_count: number;
    createdAt: string;
    updatedAt: string;
}

export const getAllCodingProfiles = async (): Promise<CodingProfile[]> => {
    const response = await fetch(CODING_PROFILES_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch coding profiles');
    }

    const data = await response.json();
    return data.data;
};

export const getCodingProfileById = async (id: string): Promise<CodingProfile> => {
    const response = await fetch(`${CODING_PROFILES_API}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch coding profile');
    }

    const data = await response.json();
    return data.data;
};

export const createCodingProfile = async (profileData: Omit<CodingProfile, '_id' | 'createdAt' | 'updatedAt'>): Promise<CodingProfile> => {
    const response = await fetch(CODING_PROFILES_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to create coding profile');
    }

    const data = await response.json();
    return data.data;
};

export const updateCodingProfile = async (id: string, profileData: Partial<CodingProfile>): Promise<CodingProfile> => {
    const response = await fetch(`${CODING_PROFILES_API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to update coding profile');
    }

    const data = await response.json();
    return data.data;
};

export const deleteCodingProfile = async (id: string): Promise<void> => {
    const response = await fetch(`${CODING_PROFILES_API}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to delete coding profile');
    }
};
