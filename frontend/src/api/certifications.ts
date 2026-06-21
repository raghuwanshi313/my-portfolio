// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Certifications API endpoints
const CERTIFICATIONS_API = `${API_BASE_URL}/certifications`;

// API Response type
export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

// Certification type
export interface Certification {
    _id: string;
    name: string;
    image: string;
    issued_by: string;
    issue_date: string;
    expiry_date?: string;
    skills: string[];
    credential_link: string;
    createdAt: string;
    updatedAt: string;
}

// Create certification data type
export interface CreateCertificationData {
    name: string;
    issued_by: string;
    issue_date: string;
    expiry_date?: string;
    skills: string[];
    credential_link?: string;
    imageFile: File;
}

// Update certification data type
export interface UpdateCertificationData {
    name?: string;
    issued_by?: string;
    issue_date?: string;
    expiry_date?: string;
    skills?: string[];
    credential_link?: string;
    imageFile?: File;
}

/**
 * Get all certifications (Public)
 */
export const getAllCertifications = async (): Promise<Certification[]> => {
    try {
        const response = await fetch(CERTIFICATIONS_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch certifications');
        }

        const result: ApiResponse<Certification[]> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching certifications:', error);
        throw error;
    }
};

/**
 * Get single certification by ID (Public)
 */
export const getCertificationById = async (id: string): Promise<Certification> => {
    try {
        const response = await fetch(`${CERTIFICATIONS_API}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch certification');
        }

        const result: ApiResponse<Certification> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching certification:', error);
        throw error;
    }
};

/**
 * Create new certification (Admin only)
 * Requires authentication cookies
 */
export const createCertification = async (data: CreateCertificationData): Promise<Certification> => {
    try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('issued_by', data.issued_by);
        formData.append('issue_date', data.issue_date);
        if (data.expiry_date) formData.append('expiry_date', data.expiry_date);
        formData.append('skills', JSON.stringify(data.skills));
        if (data.credential_link) formData.append('credential_link', data.credential_link);
        formData.append('image', data.imageFile);

        const response = await fetch(CERTIFICATIONS_API, {
            method: 'POST',
            credentials: 'include', // Important: Include cookies for authentication
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create certification');
        }

        const result: ApiResponse<Certification> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error creating certification:', error);
        throw error;
    }
};

/**
 * Update certification (Admin only)
 * Requires authentication cookies
 */
export const updateCertification = async (
    id: string,
    data: UpdateCertificationData
): Promise<Certification> => {
    try {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.issued_by) formData.append('issued_by', data.issued_by);
        if (data.issue_date) formData.append('issue_date', data.issue_date);
        if (data.expiry_date !== undefined) formData.append('expiry_date', data.expiry_date);
        if (data.skills) formData.append('skills', JSON.stringify(data.skills));
        if (data.credential_link !== undefined) formData.append('credential_link', data.credential_link);
        if (data.imageFile) formData.append('image', data.imageFile);

        const response = await fetch(`${CERTIFICATIONS_API}/${id}`, {
            method: 'PUT',
            credentials: 'include', // Important: Include cookies for authentication
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update certification');
        }

        const result: ApiResponse<Certification> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error updating certification:', error);
        throw error;
    }
};

/**
 * Delete certification (Admin only)
 * Requires authentication cookies
 */
export const deleteCertification = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${CERTIFICATIONS_API}/${id}`, {
            method: 'DELETE',
            credentials: 'include', // Important: Include cookies for authentication
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete certification');
        }
    } catch (error) {
        console.error('Error deleting certification:', error);
        throw error;
    }
};
