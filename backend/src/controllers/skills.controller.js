import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Skills from '../models/skills.models.js';

// Get skills (Public)
export const getSkills = asyncHandler(async (req, res) => {
    // Since there should only be one skills document, find the first one
    const skills = await Skills.findOne();

    if (!skills) {
        // If no skills document exists, return empty arrays
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    programming_languages: [],
                    frontend: [],
                    backend: [],
                    databases: [],
                    dev_tools: [],
                    other: [],
                },
                'No skills found'
            )
        );
    }

    return res.status(200).json(new ApiResponse(200, skills, 'Skills fetched successfully'));
});

// Update or Create skills (Admin only)
export const updateSkills = asyncHandler(async (req, res) => {
    const { programming_languages, frontend, backend, databases, dev_tools, other } = req.body;

    // Validate that at least one category is provided
    if (!programming_languages && !frontend && !backend && !databases && !dev_tools && !other) {
        throw new ApiError(400, 'At least one skill category must be provided');
    }

    // Parse arrays if they are strings
    const parseSkillArray = skills => {
        if (typeof skills === 'string') {
            try {
                return JSON.parse(skills);
            } catch (error) {
                throw new ApiError(400, 'Invalid skills format. Expected JSON array.');
            }
        }
        return skills;
    };

    const skillsData = {};
    if (programming_languages)
        skillsData.programming_languages = parseSkillArray(programming_languages);
    if (frontend) skillsData.frontend = parseSkillArray(frontend);
    if (backend) skillsData.backend = parseSkillArray(backend);
    if (databases) skillsData.databases = parseSkillArray(databases);
    if (dev_tools) skillsData.dev_tools = parseSkillArray(dev_tools);
    if (other) skillsData.other = parseSkillArray(other);

    // Validate all provided arrays
    for (const [key, value] of Object.entries(skillsData)) {
        if (!Array.isArray(value)) {
            throw new ApiError(400, `${key} must be an array`);
        }
    }

    // Find existing skills document or create new one
    let skills = await Skills.findOne();

    if (skills) {
        // Update existing document
        Object.assign(skills, skillsData);
        await skills.save();
    } else {
        // Create new document
        skills = await Skills.create(skillsData);
    }

    return res.status(200).json(new ApiResponse(200, skills, 'Skills updated successfully'));
});

// Delete all skills (Admin only)
export const deleteSkills = asyncHandler(async (req, res) => {
    const skills = await Skills.findOne();

    if (!skills) {
        throw new ApiError(404, 'Skills not found');
    }

    await Skills.findByIdAndDelete(skills._id);

    return res.status(200).json(new ApiResponse(200, {}, 'Skills deleted successfully'));
});
