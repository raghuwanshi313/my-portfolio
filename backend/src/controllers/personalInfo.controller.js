import PersonalInfo from '../models/personalInfo.models.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Get personal info (singleton pattern - only one document)
export const getPersonalInfo = asyncHandler(async (req, res) => {
    const personalInfo = await PersonalInfo.findOne();
    
    if (!personalInfo) {
        return res.status(200).json(
            new ApiResponse(200, {
                name: '',
                tagline: '',
                description: '',
                cv: '',
                profile_image: '',
                email: '',
                phone: '',
                location: '',
                social_links: {
                    github: '',
                    linkedin: '',
                    twitter: '',
                    instagram: '',
                    portfolio: '',
                },
            }, 'No personal info found. Please create one.')
        );
    }
    
    return res.status(200).json(
        new ApiResponse(200, personalInfo, 'Personal info retrieved successfully')
    );
});

// Update personal info (upsert - create if doesn't exist)
export const updatePersonalInfo = asyncHandler(async (req, res) => {
    const {
        name,
        tagline,
        description,
        email,
        phone,
        location,
        social_links,
    } = req.body;
    
    let personalInfo = await PersonalInfo.findOne();
    
    // Parse social_links if it comes as a string
    const parsedSocialLinks = typeof social_links === 'string' 
        ? JSON.parse(social_links) 
        : social_links;
    
    // Handle file uploads
    let profile_image_url = personalInfo?.profile_image;
    let cv_url = personalInfo?.cv;
    
    if (req.files) {
        // Upload profile image if provided
        if (req.files.profile_image && req.files.profile_image[0]) {
            const localPath = req.files.profile_image[0].path;
            const cloudinaryResponse = await uploadOnCloudinary(localPath);
            
            if (!cloudinaryResponse) {
                throw new ApiError(500, 'Failed to upload profile image');
            }
            
            profile_image_url = cloudinaryResponse.secure_url;
        }
        
        // Upload CV if provided
        if (req.files.cv && req.files.cv[0]) {
            const localPath = req.files.cv[0].path;
            const cloudinaryResponse = await uploadOnCloudinary(localPath);
            
            if (!cloudinaryResponse) {
                throw new ApiError(500, 'Failed to upload CV');
            }
            
            cv_url = cloudinaryResponse.secure_url;
        }
    }
    
    if (!personalInfo) {
        // Create new personal info if doesn't exist
        if (!name || !tagline || !description || !email || !profile_image_url) {
            throw new ApiError(400, 'Please provide all required fields');
        }
        
        personalInfo = await PersonalInfo.create({
            name,
            tagline,
            description,
            cv: cv_url,
            profile_image: profile_image_url,
            email,
            phone,
            location,
            social_links: parsedSocialLinks || {},
        });
    } else {
        // Update existing personal info
        if (name) personalInfo.name = name;
        if (tagline) personalInfo.tagline = tagline;
        if (description) personalInfo.description = description;
        if (cv_url) personalInfo.cv = cv_url;
        if (profile_image_url) personalInfo.profile_image = profile_image_url;
        if (email) personalInfo.email = email;
        if (phone !== undefined) personalInfo.phone = phone;
        if (location !== undefined) personalInfo.location = location;
        if (parsedSocialLinks) personalInfo.social_links = parsedSocialLinks;
        
        await personalInfo.save();
    }
    
    return res.status(200).json(
        new ApiResponse(200, personalInfo, 'Personal info updated successfully')
    );
});

// Delete personal info
export const deletePersonalInfo = asyncHandler(async (req, res) => {
    const personalInfo = await PersonalInfo.findOneAndDelete();
    
    if (!personalInfo) {
        throw new ApiError(404, 'Personal info not found');
    }
    
    return res.status(200).json(
        new ApiResponse(200, null, 'Personal info deleted successfully')
    );
});
