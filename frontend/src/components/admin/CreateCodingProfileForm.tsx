import { useState } from 'react';
import { createCodingProfile } from '../../api/codingProfiles';

interface CreateCodingProfileFormProps {
    onSuccess: () => void;
}

const CreateCodingProfileForm = ({ onSuccess }: CreateCodingProfileFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        platform: '',
        username: '',
        profile_url: '',
        rank: '',
        rating: '',
        question_count: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const profileData = {
                platform: formData.platform,
                username: formData.username,
                profile_url: formData.profile_url,
                rank: formData.rank || undefined,
                rating: formData.rating ? Number(formData.rating) : undefined,
                question_count: Number(formData.question_count),
            };

            await createCodingProfile(profileData);
            alert('Coding profile created successfully!');
            onSuccess();
        } catch (error) {
            console.error('Error creating coding profile:', error);
            alert('Failed to create coding profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 border border-[var(--nav-border-color)] rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[var(--nav-text-color)] mb-6">
                Add New Coding Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Platform */}
                <div>
                    <label htmlFor="platform" className="block text-[var(--nav-text-color)] font-medium mb-2">
                    Platform *
                </label>
                    <input
                        type="text"
                        id="platform"
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        placeholder="e.g., LeetCode, Codeforces"
                        required
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    />
            </div>

                {/* Username */}
                <div>
                    <label htmlFor="username" className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Username *
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Your username on the platform"
                        required
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    />
            </div>

                {/* Profile URL */}
                <div>
                    <label htmlFor="profile_url" className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Profile URL *
                    </label>
                    <input
                        type="url"
                        id="profile_url"
                        name="profile_url"
                        value={formData.profile_url}
                        onChange={handleChange}
                        placeholder="https://leetcode.com/username"
                        required
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    />
            </div>

                {/* Rank */}
                <div>
                    <label htmlFor="rank" className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Rank (Optional)
                    </label>
                    <input
                        type="text"
                        id="rank"
                        name="rank"
                        value={formData.rank}
                        onChange={handleChange}
                        placeholder="e.g., Knight, Pupil, Expert"
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    />
            </div>

                {/* Rating */}
                <div>
                    <label htmlFor="rating" className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Rating (Optional)
                    </label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="e.g., 1850"
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    />
            </div>

                {/* Question Count */}
                <div>
                    <label htmlFor="question_count" className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Problems Solved *
                    </label>
                    <input
                        type="number"
                        id="question_count"
                        name="question_count"
                        value={formData.question_count}
                        onChange={handleChange}
                        placeholder="e.g., 621"
                        required
                        min="0"
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    />
            </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Coding Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCodingProfileForm;
