import React, { useState, useEffect } from 'react';
import { updateCertification, getCertificationById, type UpdateCertificationData } from '../../api/certifications';
import { FaUpload, FaPlus, FaTimes } from 'react-icons/fa';

interface EditCertificationFormProps {
    certificationId: string;
    onSuccess?: () => void;
}

const EditCertificationForm: React.FC<EditCertificationFormProps> = ({ certificationId, onSuccess }) => {
    const [formData, setFormData] = useState<Omit<UpdateCertificationData, 'imageFile'> & { imageFile: File | null }>({
        name: '',
        issued_by: '',
        issue_date: '',
        expiry_date: '',
        skills: [],
        credential_link: '',
        imageFile: null,
    });
    const [skillInput, setSkillInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                setFetchLoading(true);
                const data = await getCertificationById(certificationId);
                setFormData({
                    name: data.name,
                    issued_by: data.issued_by,
                    issue_date: data.issue_date.split('T')[0],
                    expiry_date: data.expiry_date ? data.expiry_date.split('T')[0] : '',
                    skills: data.skills,
                    credential_link: data.credential_link || '',
                    imageFile: null,
                });
                setImagePreview(data.image);
            } catch (_err) {
                setError('Failed to fetch certification data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchCertification();
    }, [certificationId]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills?.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...(formData.skills || []), skillInput.trim()],
            });
            setSkillInput('');
        }
    };

    const removeSkill = (skill: string) => {
        setFormData({
            ...formData,
            skills: formData.skills?.filter((s) => s !== skill) || [],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.skills && formData.skills.length === 0) {
            setError('Please add at least one skill');
            return;
        }

        try {
            setLoading(true);
            await updateCertification(certificationId, formData as UpdateCertificationData);
            alert('Certification updated successfully! 🎉');
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update certification');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6 border border-[var(--nav-border-color)] rounded-xl shadow-lg">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                    <p className="text-[var(--nav-text-color)]">Loading certification...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 border border-[var(--nav-border-color)] rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Certification Name *
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="Enter certification name"
                        required
                    />
                </div>

                {/* Issued By */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Issued By *
                    </label>
                    <input
                        type="text"
                        value={formData.issued_by}
                        onChange={(e) => setFormData({ ...formData, issued_by: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="e.g., AWS, Google, Microsoft"
                        required
                    />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Issue Date *
                        </label>
                        <input
                            type="date"
                            value={formData.issue_date}
                            onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Expiry Date (Optional)
                        </label>
                        <input
                            type="date"
                            value={formData.expiry_date}
                            onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Certification Image (Leave blank to keep current)
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-6 py-3 bg-[var(--nav-text-hover)] text-white font-medium rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                            <FaUpload />
                            Choose New Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-20 w-20 object-cover rounded-lg border-2 border-[var(--nav-border-color)]"
                            />
                        )}
                    </div>
                </div>

                {/* Credential Link */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Credential Link (Optional)
                    </label>
                    <input
                        type="url"
                        value={formData.credential_link}
                        onChange={(e) => setFormData({ ...formData, credential_link: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="https://www.credly.com/badges/..."
                    />
                </div>

                {/* Skills */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Skills *
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            className="flex-1 px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="e.g., Cloud Computing, AWS"
                        />
                        <button
                            type="button"
                            onClick={addSkill}
                            className="px-6 py-3 bg-[var(--nav-text-hover)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <FaPlus /> Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills?.map((skill, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--nav-text-hover)] text-white rounded-lg"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className="hover:text-red-300 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-[var(--nav-text-hover)] text-white font-bold text-lg rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Updating Certification...' : 'Update Certification'}
                </button>
            </form>
        </div>
    );
};

export default EditCertificationForm;
