import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Certification name is required'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Certification image is required'],
        },
        issued_by: {
            type: String,
            required: [true, 'Issuing organization is required'],
            trim: true,
        },
        issue_date: {
            type: Date,
            required: [true, 'Issue date is required'],
        },
        expiry_date: {
            type: Date,
        },
        skills: {
            type: [String],
            default: [],
        },
        credential_link: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
        },
        order: {
            type: Number,
            default: 999,
        },
    },
    { timestamps: true }
);

const Certification = mongoose.model('Certification', certificationSchema);

export default Certification;
