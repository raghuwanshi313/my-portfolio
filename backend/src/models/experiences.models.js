import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
    {
        company_name: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },
        company_logo: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        joining_date: {
            type: Date,
            required: [true, 'Joining date is required'],
        },
        leaving_date: {
            type: Date,
        },
        is_current: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        achievements: {
            type: [String],
            default: [],
        },
        tech_stack: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

// Validation: If is_current is true, leaving_date should not be set
experienceSchema.pre('save', function (next) {
    if (this.is_current && this.leaving_date) {
        this.leaving_date = undefined;
    }
    next();
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
