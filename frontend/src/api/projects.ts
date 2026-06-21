// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Projects API endpoints
const PROJECTS_API = `${API_BASE_URL}/projects`;

// API Response type
export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

// Project type
export interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    tech_stacks: string[];
    github_link: string;
    live_link?: string;
    createdAt: string;
    updatedAt: string;
}

// Create project data type
export interface CreateProjectData {
    title: string;
    description: string;
    github_link: string;
    live_link?: string;
    tech_stacks: string[];
    imageFile: File;
}

// Update project data type
export interface UpdateProjectData {
    title?: string;
    description?: string;
    github_link?: string;
    live_link?: string;
    tech_stacks?: string[];
    imageFile?: File;
}

/**
 * Get all projects (Public)
 */
export const getAllProjects = async (): Promise<Project[]> => {
    try {
        const response = await fetch(PROJECTS_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        const result: ApiResponse<Project[]> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

/**
 * Get single project by ID (Public)
 */
export const getProjectById = async (id: string): Promise<Project> => {
    try {
        const response = await fetch(`${PROJECTS_API}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch project');
        }

        const result: ApiResponse<Project> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};

/**
 * Create new project (Admin only)
 * Requires authentication cookies
 */
export const createProject = async (data: CreateProjectData): Promise<Project> => {
    try {
        const formData = new FormData();

        // Append text fields
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('github_link', data.github_link);
        
        if (data.live_link) {
            formData.append('live_link', data.live_link);
        }

        // Append tech_stacks as JSON string
        formData.append('tech_stacks', JSON.stringify(data.tech_stacks));

        // Append image file
        formData.append('image', data.imageFile);

        const response = await fetch(PROJECTS_API, {
            method: 'POST',
            credentials: 'include', // Important: Send cookies with request
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create project');
        }

        const result: ApiResponse<Project> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

/**
 * Update existing project (Admin only)
 * Requires authentication cookies
 */
export const updateProject = async (id: string, data: UpdateProjectData): Promise<Project> => {
    try {
        const formData = new FormData();

        // Append only provided fields
        if (data.title) formData.append('title', data.title);
        if (data.description) formData.append('description', data.description);
        if (data.github_link) formData.append('github_link', data.github_link);
        if (data.live_link !== undefined) formData.append('live_link', data.live_link);
        
        if (data.tech_stacks) {
            formData.append('tech_stacks', JSON.stringify(data.tech_stacks));
        }

        // Append image file only if provided
        if (data.imageFile) {
            formData.append('image', data.imageFile);
        }

        const response = await fetch(`${PROJECTS_API}/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update project');
        }

        const result: ApiResponse<Project> = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

/**
 * Delete project (Admin only)
 * Requires authentication cookies
 */
export const deleteProject = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${PROJECTS_API}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};
