import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import Project from '../models/projects.models.js';

// Get all projects (Public)
export const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, projects, 'Projects fetched successfully'));
});

// Get single project by ID (Public)
export const getProjectById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, project, 'Project fetched successfully'));
});

// Create new project (Admin only)
export const createProject = asyncHandler(async (req, res) => {
    const { title, description, github_link, live_link, tech_stacks } = req.body;

    // Validate required fields
    if (!title || !description || !github_link) {
        throw new ApiError(400, 'Title, description, and github_link are required');
    }

    // Check if image file is uploaded
    if (!req.file) {
        throw new ApiError(400, 'Project image is required');
    }

    // Upload image to cloudinary
    const imageUpload = await uploadOnCloudinary(req.file.path);

    if (!imageUpload) {
        throw new ApiError(500, 'Failed to upload image to cloudinary');
    }

    // Parse tech_stacks if it's a string
    let parsedTechStacks = tech_stacks;
    if (typeof tech_stacks === 'string') {
        try {
            parsedTechStacks = JSON.parse(tech_stacks);
        } catch (error) {
            throw new ApiError(400, 'Invalid tech_stacks format. Expected JSON array.');
        }
    }

    // Validate tech_stacks is an array
    if (!Array.isArray(parsedTechStacks) || parsedTechStacks.length === 0) {
        throw new ApiError(400, 'tech_stacks must be a non-empty array');
    }

    // Create project
    const project = await Project.create({
        title,
        description,
        image: imageUpload.secure_url,
        tech_stacks: parsedTechStacks,
        github_link,
        live_link: live_link || '',
    });

    return res
        .status(201)
        .json(new ApiResponse(201, project, 'Project created successfully'));
});

// Update project (Admin only)
export const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, github_link, live_link, tech_stacks } = req.body;

    // Find existing project
    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (github_link) project.github_link = github_link;
    if (live_link !== undefined) project.live_link = live_link;

    // Update tech_stacks
    if (tech_stacks) {
        let parsedTechStacks = tech_stacks;
        if (typeof tech_stacks === 'string') {
            try {
                parsedTechStacks = JSON.parse(tech_stacks);
            } catch (error) {
                throw new ApiError(400, 'Invalid tech_stacks format. Expected JSON array.');
            }
        }

        if (!Array.isArray(parsedTechStacks) || parsedTechStacks.length === 0) {
            throw new ApiError(400, 'tech_stacks must be a non-empty array');
        }

        project.tech_stacks = parsedTechStacks;
    }

    // If new image is uploaded, delete old one and upload new
    if (req.file) {
        // Extract public_id from old image URL and delete
        if (project.image) {
            try {
                const urlParts = project.image.split('/');
                const publicIdWithExtension = urlParts.slice(-2).join('/');
                const publicId = publicIdWithExtension.split('.')[0];
                await deleteFromCloudinary(publicId);
            } catch (error) {
                console.error('Error deleting old image:', error);
                // Continue even if deletion fails
            }
        }

        // Upload new image
        const imageUpload = await uploadOnCloudinary(req.file.path);

        if (!imageUpload) {
            throw new ApiError(500, 'Failed to upload image to cloudinary');
        }

        project.image = imageUpload.secure_url;
    }

    await project.save();

    return res
        .status(200)
        .json(new ApiResponse(200, project, 'Project updated successfully'));
});

// Delete project (Admin only)
export const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    // Delete image from cloudinary
    if (project.image) {
        try {
            const urlParts = project.image.split('/');
            const publicIdWithExtension = urlParts.slice(-2).join('/');
            const publicId = publicIdWithExtension.split('.')[0];
            await deleteFromCloudinary(publicId);
        } catch (error) {
            console.error('Error deleting image from cloudinary:', error);
            // Continue with project deletion even if image deletion fails
        }
    }

    await Project.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Project deleted successfully'));
});
