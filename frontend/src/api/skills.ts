// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Skills API endpoints
const SKILLS_API = `${API_BASE_URL}/skills`;

// API Response type
export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

// Skills type
export interface Skills {
    _id?: string;
    programming_languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    dev_tools: string[];
    other: string[];
    createdAt?: string;
    updatedAt?: string;
}

// Update skills data type
export interface UpdateSkillsData {
    programming_languages?: string[];
    frontend?: string[];
    backend?: string[];
    databases?: string[];
    dev_tools?: string[];
    other?: string[];
}

/**
 * Get skills (Public)
 */
export const getSkills = async (): Promise<Skills> => {
    try {
        const response = await fetch(SKILLS_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch skills');
        }

        const result: ApiResponse<Skills> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }
};

/**
 * Update skills (Admin only)
 * Requires authentication cookies
 */
export const updateSkills = async (data: UpdateSkillsData): Promise<Skills> => {
    try {
        const response = await fetch(SKILLS_API, {
            method: 'PUT',
            credentials: 'include', // Important: Include cookies for authentication
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update skills');
        }

        const result: ApiResponse<Skills> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error updating skills:', error);
        throw error;
    }
};

/**
 * Delete skills (Admin only)
 * Requires authentication cookies
 */
export const deleteSkills = async (): Promise<void> => {
    try {
        const response = await fetch(SKILLS_API, {
            method: 'DELETE',
            credentials: 'include', // Important: Include cookies for authentication
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete skills');
        }
    } catch (error) {
        console.error('Error deleting skills:', error);
        throw error;
    }
};
