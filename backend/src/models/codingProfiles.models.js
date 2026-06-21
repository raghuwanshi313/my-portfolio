import mongoose from 'mongoose';

const codingProfileSchema = new mongoose.Schema(
    {
        platform: {
            type: String,
            required: [true, 'Platform name is required'],
            trim: true,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
        },
        profile_url: {
            type: String,
            required: [true, 'Profile URL is required'],
            trim: true,
            match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
        },
        rank: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
        },
        question_count: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const CodingProfile = mongoose.model('CodingProfile', codingProfileSchema);

export default CodingProfile;
