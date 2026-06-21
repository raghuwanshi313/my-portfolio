import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        tagline: {
            type: String,
            required: [true, 'Tagline is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        cv: {
            type: String,
            trim: true,
        },
        profile_image: {
            type: String,
            required: [true, 'Profile image is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        phone: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        social_links: {
            github: {
                type: String,
                trim: true,
            },
            linkedin: {
                type: String,
                trim: true,
            },
            twitter: {
                type: String,
                trim: true,
            },
            instagram: {
                type: String,
                trim: true,
            },
            portfolio: {
                type: String,
                trim: true,
            },
        },
    },
    { timestamps: true }
);

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

export default PersonalInfo;
