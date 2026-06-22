import Experience from '../models/experiences.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Get all experiences
export const getAllExperiences = asyncHandler(async (req, res) => {
    const experiences = await Experience.find().sort({ joining_date: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, experiences, 'Experiences retrieved successfully'));
});

// Get experience by ID
export const getExperienceById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const experience = await Experience.findById(id);

    if (!experience) {
        throw new ApiError(404, 'Experience not found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, experience, 'Experience retrieved successfully'));
});

// Create new experience
export const createExperience = asyncHandler(async (req, res) => {
    const {
        company_name,
        role,
        location,
        joining_date,
        leaving_date,
        is_current,
        description,
        achievements,
        tech_stack,
    } = req.body;

    // Validate required fields
    if (!company_name || !role || !joining_date || !description) {
        throw new ApiError(400, 'Please provide all required fields');
    }

    let company_logo_url = null;

    // Upload company logo if provided
    if (req.file) {
        const localPath = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(localPath);

        if (!cloudinaryResponse) {
            throw new ApiError(500, 'Failed to upload company logo');
        }

        company_logo_url = cloudinaryResponse.secure_url;
    }

    // Parse arrays if they come as strings
    const parsedAchievements =
        typeof achievements === 'string' ? JSON.parse(achievements) : achievements || [];
    const parsedTechStack =
        typeof tech_stack === 'string' ? JSON.parse(tech_stack) : tech_stack || [];

    const experience = await Experience.create({
        company_name,
        company_logo: company_logo_url,
        role,
        location,
        joining_date,
        leaving_date: is_current === 'true' || is_current === true ? undefined : leaving_date,
        is_current: is_current === 'true' || is_current === true,
        description,
        achievements: parsedAchievements,
        tech_stack: parsedTechStack,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, experience, 'Experience created successfully'));
});

// Update experience
export const updateExperience = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        company_name,
        role,
        location,
        joining_date,
        leaving_date,
        is_current,
        description,
        achievements,
        tech_stack,
    } = req.body;

    const experience = await Experience.findById(id);

    if (!experience) {
        throw new ApiError(404, 'Experience not found');
    }

    // Upload new company logo if provided
    if (req.file) {
        const localPath = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(localPath);

        if (!cloudinaryResponse) {
            throw new ApiError(500, 'Failed to upload company logo');
        }

        experience.company_logo = cloudinaryResponse.secure_url;
    }

    // Parse arrays if they come as strings
    const parsedAchievements =
        typeof achievements === 'string' ? JSON.parse(achievements) : achievements;
    const parsedTechStack = typeof tech_stack === 'string' ? JSON.parse(tech_stack) : tech_stack;

    // Update fields
    if (company_name) experience.company_name = company_name;
    if (role) experience.role = role;
    if (location !== undefined) experience.location = location;
    if (joining_date) experience.joining_date = joining_date;
    if (is_current !== undefined) {
        experience.is_current = is_current === 'true' || is_current === true;
        if (experience.is_current) {
            experience.leaving_date = undefined;
        }
    }
    if (!experience.is_current && leaving_date !== undefined) {
        experience.leaving_date = leaving_date;
    }
    if (description) experience.description = description;
    if (parsedAchievements) experience.achievements = parsedAchievements;
    if (parsedTechStack) experience.tech_stack = parsedTechStack;

    await experience.save();

    return res
        .status(200)
        .json(new ApiResponse(200, experience, 'Experience updated successfully'));
});

// Delete experience
export const deleteExperience = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
        throw new ApiError(404, 'Experience not found');
    }

    return res.status(200).json(new ApiResponse(200, null, 'Experience deleted successfully'));
});
