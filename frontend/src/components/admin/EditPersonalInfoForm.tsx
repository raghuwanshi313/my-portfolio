import { useState, useEffect } from 'react';
import { FaSave, FaUpload } from 'react-icons/fa';
import { usePersonalInfo } from '../../hooks/usePersonalInfo';
import { updatePersonalInfo } from '../../api/personalInfo';

interface EditPersonalInfoFormProps {
    onSuccess: () => void;
}

const EditPersonalInfoForm = ({ onSuccess }: EditPersonalInfoFormProps) => {
    const { personalInfo, loading: fetchLoading } = usePersonalInfo();
    const [submitting, setSubmitting] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [cv, setCv] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        tagline: '',
        description: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: '',
        instagram: '',
        portfolio: '',
    });

    useEffect(() => {
        if (personalInfo) {
            setFormData({
                name: personalInfo.name || '',
                tagline: personalInfo.tagline || '',
                description: personalInfo.description || '',
                email: personalInfo.email || '',
                phone: personalInfo.phone || '',
                location: personalInfo.location || '',
                github: personalInfo.social_links?.github || '',
                linkedin: personalInfo.social_links?.linkedin || '',
                twitter: personalInfo.social_links?.twitter || '',
                instagram: personalInfo.social_links?.instagram || '',
                portfolio: personalInfo.social_links?.portfolio || '',
            });
            setImagePreview(personalInfo.profile_image || null);
        }
    }, [personalInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('tagline', formData.tagline);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('email', formData.email);
            if (formData.phone) formDataToSend.append('phone', formData.phone);
            if (formData.location) formDataToSend.append('location', formData.location);

            const socialLinks = {
                github: formData.github,
                linkedin: formData.linkedin,
                twitter: formData.twitter,
                instagram: formData.instagram,
                portfolio: formData.portfolio,
            };
            formDataToSend.append('social_links', JSON.stringify(socialLinks));

            if (profileImage) {
                formDataToSend.append('profile_image', profileImage);
            }
            if (cv) {
                formDataToSend.append('cv', cv);
            }

            await updatePersonalInfo(formDataToSend);
            alert('Personal info updated successfully!');
            onSuccess();
        } catch (error) {
            console.error('Error updating personal info:', error);
            alert('Failed to update personal info');
        } finally {
            setSubmitting(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                <p className="text-[var(--nav-text-color)]">Loading personal info...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 border border-[var(--nav-border-color)] rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[var(--nav-text-color)] mb-6">
                Edit Personal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[var(--nav-text-color)]">Basic Information</h3>
                    
                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Tagline *
                        </label>
                        <input
                            type="text"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="e.g., Full Stack Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="Brief description about yourself..."
                        />
                    </div>
                </div>

                {/* Profile Image */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Profile Image
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-6 py-3 bg-[var(--nav-text-hover)] text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                            <FaUpload />
                            <span>Choose Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setProfileImage(file);
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImagePreview(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Profile Preview"
                                className="h-20 w-20 object-cover rounded-full border-2 border-[var(--nav-border-color)]"
                            />
                        )}
                    </div>
                </div>

                {/* CV Upload */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        CV/Resume
                    </label>
                    <label className="flex items-center gap-2 px-6 py-3 bg-[var(--nav-text-hover)] text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity inline-flex">
                        <FaUpload />
                        <span>{cv ? cv.name : personalInfo?.cv ? 'Replace CV' : 'Upload CV'}</span>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setCv(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                    </label>
                    {personalInfo?.cv && !cv && (
                        <p className="text-sm text-[var(--nav-text-color)] opacity-60 mt-2">
                            Current CV uploaded
                        </p>
                    )}
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[var(--nav-text-color)]">Contact Information</h3>
                    
                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="City, Country"
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[var(--nav-text-color)]">Social Links</h3>
                    
                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            GitHub
                        </label>
                        <input
                            type="url"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            LinkedIn
                        </label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Twitter
                        </label>
                        <input
                            type="url"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="https://twitter.com/username"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Instagram
                        </label>
                        <input
                            type="url"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="https://instagram.com/username"
                        />
                    </div>

                    <div>
                        <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                            Portfolio/Other
                        </label>
                        <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FaSave /> Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPersonalInfoForm;
