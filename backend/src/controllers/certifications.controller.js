import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';
import Certification from '../models/certifications.models.js';

// Get all certifications (Public)
export const getAllCertifications = asyncHandler(async (req, res) => {
    const certifications = await Certification.find().sort({ order: 1, issue_date: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, certifications, 'Certifications fetched successfully'));
});

// Get single certification by ID (Public)
export const getCertificationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const certification = await Certification.findById(id);

    if (!certification) {
        throw new ApiError(404, 'Certification not found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, certification, 'Certification fetched successfully'));
});

// Create new certification (Admin only)
export const createCertification = asyncHandler(async (req, res) => {
    const { name, issued_by, issue_date, expiry_date, skills, credential_link } = req.body;

    // Validate required fields
    if (!name || !issued_by || !issue_date) {
        throw new ApiError(400, 'Name, issued_by, and issue_date are required');
    }

    // Check if image file is uploaded
    if (!req.file) {
        throw new ApiError(400, 'Certification image is required');
    }

    // Upload image to cloudinary
    const imageUpload = await uploadOnCloudinary(req.file.path);

    if (!imageUpload) {
        throw new ApiError(500, 'Failed to upload image to cloudinary');
    }

    // Parse skills if it's a string
    let parsedSkills = skills;
    if (typeof skills === 'string') {
        try {
            parsedSkills = JSON.parse(skills);
        } catch (error) {
            throw new ApiError(400, 'Invalid skills format. Expected JSON array.');
        }
    }

    // Validate skills is an array
    if (parsedSkills && !Array.isArray(parsedSkills)) {
        throw new ApiError(400, 'skills must be an array');
    }

    // Create certification
    const certification = await Certification.create({
        name,
        image: imageUpload.secure_url,
        issued_by,
        issue_date,
        expiry_date: expiry_date || undefined,
        skills: parsedSkills || [],
        credential_link: credential_link || '',
    });

    return res
        .status(201)
        .json(new ApiResponse(201, certification, 'Certification created successfully'));
});

// Update certification (Admin only)
export const updateCertification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, issued_by, issue_date, expiry_date, skills, credential_link } = req.body;

    // Find existing certification
    const certification = await Certification.findById(id);

    if (!certification) {
        throw new ApiError(404, 'Certification not found');
    }

    // Update fields
    if (name) certification.name = name;
    if (issued_by) certification.issued_by = issued_by;
    if (issue_date) certification.issue_date = issue_date;
    if (expiry_date !== undefined) certification.expiry_date = expiry_date || null;
    if (credential_link !== undefined) certification.credential_link = credential_link;
    if (req.body.order !== undefined) certification.order = Number(req.body.order);

    // Update skills
    if (skills) {
        let parsedSkills = skills;
        if (typeof skills === 'string') {
            try {
                parsedSkills = JSON.parse(skills);
            } catch (error) {
                throw new ApiError(400, 'Invalid skills format. Expected JSON array.');
            }
        }

        if (!Array.isArray(parsedSkills)) {
            throw new ApiError(400, 'skills must be an array');
        }

        certification.skills = parsedSkills;
    }

    // If new image is uploaded, delete old one and upload new
    if (req.file) {
        // Extract public_id from old image URL and delete
        if (certification.image) {
            try {
                const urlParts = certification.image.split('/');
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

        certification.image = imageUpload.secure_url;
    }

    await certification.save();

    return res
        .status(200)
        .json(new ApiResponse(200, certification, 'Certification updated successfully'));
});

// Delete certification (Admin only)
export const deleteCertification = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const certification = await Certification.findById(id);

    if (!certification) {
        throw new ApiError(404, 'Certification not found');
    }

    // Delete image from cloudinary
    if (certification.image) {
        try {
            const urlParts = certification.image.split('/');
            const publicIdWithExtension = urlParts.slice(-2).join('/');
            const publicId = publicIdWithExtension.split('.')[0];
            await deleteFromCloudinary(publicId);
        } catch (error) {
            console.error('Error deleting image from cloudinary:', error);
            // Continue with certification deletion even if image deletion fails
        }
    }

    await Certification.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, {}, 'Certification deleted successfully'));
});
