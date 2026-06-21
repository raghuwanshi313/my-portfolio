import CodingProfile from '../models/codingProfiles.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Get all coding profiles
export const getAllCodingProfiles = asyncHandler(async (req, res) => {
    const profiles = await CodingProfile.find().sort({ createdAt: -1 });
    
    return res.status(200).json(
        new ApiResponse(200, profiles, 'Coding profiles retrieved successfully')
    );
});

// Get coding profile by ID
export const getCodingProfileById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const profile = await CodingProfile.findById(id);
    
    if (!profile) {
        throw new ApiError(404, 'Coding profile not found');
    }
    
    return res.status(200).json(
        new ApiResponse(200, profile, 'Coding profile retrieved successfully')
    );
});

// Create new coding profile
export const createCodingProfile = asyncHandler(async (req, res) => {
    const { platform, username, profile_url, rank, rating, question_count } = req.body;
    
    // Validate required fields
    if (!platform || !username || !profile_url) {
        throw new ApiError(400, 'Please provide all required fields');
    }
    
    const profile = await CodingProfile.create({
        platform,
        username,
        profile_url,
        rank,
        rating,
        question_count,
    });
    
    return res.status(201).json(
        new ApiResponse(201, profile, 'Coding profile created successfully')
    );
});

// Update coding profile
export const updateCodingProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { platform, username, profile_url, rank, rating, question_count } = req.body;
    
    const profile = await CodingProfile.findById(id);
    
    if (!profile) {
        throw new ApiError(404, 'Coding profile not found');
    }
    
    // Update fields
    if (platform) profile.platform = platform;
    if (username) profile.username = username;
    if (profile_url) profile.profile_url = profile_url;
    if (rank !== undefined) profile.rank = rank;
    if (rating !== undefined) profile.rating = rating;
    if (question_count !== undefined) profile.question_count = question_count;
    
    await profile.save();
    
    return res.status(200).json(
        new ApiResponse(200, profile, 'Coding profile updated successfully')
    );
});

// Delete coding profile
export const deleteCodingProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const profile = await CodingProfile.findByIdAndDelete(id);
    
    if (!profile) {
        throw new ApiError(404, 'Coding profile not found');
    }
    
    return res.status(200).json(
        new ApiResponse(200, null, 'Coding profile deleted successfully')
    );
});
