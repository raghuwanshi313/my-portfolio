import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Project image is required'],
        },
        tech_stacks: {
            type: [String],
            required: [true, 'Tech stacks are required'],
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: 'At least one tech stack is required',
            },
        },
        github_link: {
            type: String,
            required: [true, 'GitHub link is required'],
            trim: true,
            match: [/^https?:\/\/(www\.)?github\.com\/.+/, 'Please provide a valid GitHub URL'],
        },
        live_link: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
        },
    },
    { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
