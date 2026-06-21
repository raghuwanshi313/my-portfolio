import { useState } from 'react';
import { FaSave, FaUpload } from 'react-icons/fa';
import { createExperience } from '../../api/experiences';

interface CreateExperienceFormProps {
    onSuccess: () => void;
}

const CreateExperienceForm = ({ onSuccess }: CreateExperienceFormProps) => {
    const [formData, setFormData] = useState({
        company_name: '',
        role: '',
        location: '',
        joining_date: '',
        leaving_date: '',
        is_current: false,
        description: '',
        achievements: [''],
        tech_stack: [''],
    });
    const [companyLogo, setCompanyLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('company_name', formData.company_name);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('joining_date', formData.joining_date);
            if (!formData.is_current && formData.leaving_date) {
                formDataToSend.append('leaving_date', formData.leaving_date);
            }
            formDataToSend.append('is_current', String(formData.is_current));
            formDataToSend.append('description', formData.description);
            formDataToSend.append('achievements', JSON.stringify(formData.achievements.filter(a => a.trim())));
            formDataToSend.append('tech_stack', JSON.stringify(formData.tech_stack.filter(t => t.trim())));
            
            if (companyLogo) {
                formDataToSend.append('company_logo', companyLogo);
            }

            await createExperience(formDataToSend);
            alert('Experience created successfully!');
            onSuccess();
        } catch (_error) {
            alert('Failed to create experience');
        } finally {
            setSubmitting(false);
        }
    };

    const addAchievement = () => {
        setFormData({ ...formData, achievements: [...formData.achievements, ''] });
    };

    const removeAchievement = (index: number) => {
        setFormData({
            ...formData,
            achievements: formData.achievements.filter((_, i) => i !== index),
        });
    };

    const updateAchievement = (index: number, value: string) => {
        const newAchievements = [...formData.achievements];
        newAchievements[index] = value;
        setFormData({ ...formData, achievements: newAchievements });
    };

    const addTechStack = () => {
        setFormData({ ...formData, tech_stack: [...formData.tech_stack, ''] });
    };

    const removeTechStack = (index: number) => {
        setFormData({
            ...formData,
            tech_stack: formData.tech_stack.filter((_, i) => i !== index),
        });
    };

    const updateTechStack = (index: number, value: string) => {
        const newTechStack = [...formData.tech_stack];
        newTechStack[index] = value;
        setFormData({ ...formData, tech_stack: newTechStack });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 border border-[var(--nav-border-color)] rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[var(--nav-text-color)] mb-6">
                Add New Experience
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Company Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="Enter company name"
                    />
                </div>

                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Role *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="e.g., Senior Software Engineer"
                    />
                </div>

                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="e.g., San Francisco, CA"
                    />
                </div>

                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Company Logo
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-6 py-3 bg-[var(--nav-text-hover)] text-white font-medium rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                            <FaUpload />
                            Choose Logo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setCompanyLogo(file);
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setLogoPreview(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        setLogoPreview(null);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                        {logoPreview && (
                            <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="h-20 w-20 object-cover rounded-lg border-2 border-[var(--nav-border-color)]"
                            />
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Joining Date *
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.joining_date}
                        onChange={(e) => setFormData({ ...formData, joining_date: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    />
                </div>

                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Leaving Date
                    </label>
                    <input
                        type="date"
                        disabled={formData.is_current}
                        value={formData.leaving_date}
                        onChange={(e) => setFormData({ ...formData, leaving_date: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)] disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="is_current"
                    checked={formData.is_current}
                    onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, leaving_date: '' })}
                    className="w-4 h-4"
                />
                <label htmlFor="is_current" className="text-sm font-medium text-[var(--nav-text-color)]">
                    Currently working here
                </label>
            </div>

            <div>
                <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                    Description *
                </label>
                <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                    placeholder="Describe your role and responsibilities..."
                />
            </div>

            <div>
                <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                    Key Achievements
                </label>
                {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, e.target.value)}
                            className="flex-1 px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="Enter achievement"
                        />
                        <button
                            type="button"
                            onClick={() => removeAchievement(index)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addAchievement}
                    className="mt-2 px-4 py-2 bg-[var(--nav-text-hover)] text-white rounded-lg hover:opacity-90"
                >
                    Add Achievement
                </button>
            </div>

            <div>
                <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                    Tech Stack
                </label>
                {formData.tech_stack.map((tech, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={tech}
                            onChange={(e) => updateTechStack(index, e.target.value)}
                            className="flex-1 px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="Enter technology"
                        />
                        <button
                            type="button"
                            onClick={() => removeTechStack(index)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addTechStack}
                    className="mt-2 px-4 py-2 bg-[var(--nav-text-hover)] text-white rounded-lg hover:opacity-90"
                >
                    Add Tech
                </button>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg disabled:opacity-50"
                >
                    {submitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Creating...
                        </>
                    ) : (
                        <>
                            <FaSave /> Create Experience
                        </>
                    )}
                </button>
            </div>
        </form>
        </div>
    );
};

export default CreateExperienceForm;
