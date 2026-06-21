import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema(
    {
        programming_languages: {
            type: [String],
            default: [],
        },
        frontend: {
            type: [String],
            default: [],
        },
        backend: {
            type: [String],
            default: [],
        },
        databases: {
            type: [String],
            default: [],
        },
        dev_tools: {
            type: [String],
            default: [],
        },
        other: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Skills = mongoose.model('Skills', skillsSchema);

export default Skills;
