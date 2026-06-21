import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import { updateSkills } from '../../api/skills';
import { useSkills } from '../../hooks/useSkills';

interface EditSkillsFormProps {
    onSuccess: () => void;
}

const EditSkillsForm = ({ onSuccess }: EditSkillsFormProps) => {
    const { skills, loading } = useSkills();
    const [formData, setFormData] = useState({
        programming_languages: [] as string[],
        frontend: [] as string[],
        backend: [] as string[],
        databases: [] as string[],
        dev_tools: [] as string[],
        other: [] as string[],
    });
    const [newSkills, setNewSkills] = useState({
        programming_languages: '',
        frontend: '',
        backend: '',
        databases: '',
        dev_tools: '',
        other: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (skills) {
            setFormData({
                programming_languages: skills.programming_languages || [],
                frontend: skills.frontend || [],
                backend: skills.backend || [],
                databases: skills.databases || [],
                dev_tools: skills.dev_tools || [],
                other: skills.other || [],
            });
        }
    }, [skills]);

    const handleAddSkill = (category: keyof typeof formData) => {
        const newSkill = newSkills[category].trim();
        if (newSkill && !formData[category].includes(newSkill)) {
            setFormData({
                ...formData,
                [category]: [...formData[category], newSkill],
            });
            setNewSkills({ ...newSkills, [category]: '' });
        }
    };

    const handleRemoveSkill = (category: keyof typeof formData, skill: string) => {
        setFormData({
            ...formData,
            [category]: formData[category].filter((s) => s !== skill),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await updateSkills(formData);
            alert('Skills updated successfully!');
            onSuccess();
        } catch (error) {
            alert('Failed to update skills');
        } finally {
            setSubmitting(false);
        }
    };

    const categories = [
        { key: 'programming_languages' as const, label: 'Programming Languages', emoji: '💻' },
        { key: 'frontend' as const, label: 'Frontend', emoji: '🎨' },
        { key: 'backend' as const, label: 'Backend', emoji: '⚙️' },
        { key: 'databases' as const, label: 'Databases', emoji: '🗄️' },
        { key: 'dev_tools' as const, label: 'Development Tools', emoji: '🛠️' },
        { key: 'other' as const, label: 'Other', emoji: '📦' },
    ];

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                <p className="text-[var(--nav-text-color)]">Loading skills...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--nav-text-color)] mb-6">
                Edit Skills
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {categories.map((category) => (
                    <div
                        key={category.key}
                        className="border border-[var(--nav-border-color)] rounded-xl shadow-lg p-6"
                    >
                    <h3 className="text-xl font-bold text-[var(--nav-text-color)] mb-4 flex items-center gap-2">
                        <span>{category.emoji}</span>
                        {category.label}
                    </h3>

                        {/* Add New Skill */}
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newSkills[category.key]}
                                onChange={(e) =>
                                    setNewSkills({ ...newSkills, [category.key]: e.target.value })
                                }
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddSkill(category.key);
                                    }
                                }}
                                placeholder={`Add ${category.label.toLowerCase()}...`}
                                className="flex-1 px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] placeholder-[var(--nav-text-color)] placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            />
                        <button
                            type="button"
                            onClick={() => handleAddSkill(category.key)}
                            className="px-4 py-2 bg-[var(--nav-text-hover)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <FaPlus /> Add
                        </button>
                    </div>

                    {/* Skills List */}
                    <div className="flex flex-wrap gap-2">
                        {formData[category.key].length === 0 ? (
                            <p className="text-[var(--nav-text-color)] opacity-50 italic">
                                No skills added yet
                            </p>
                        ) : (
                            formData[category.key].map((skill) => (
                                <div
                                    key={skill}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-[var(--nav-card-2-bg)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] group hover:border-red-500 transition-colors"
                                >
                                    <span>{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(category.key, skill)}
                                        className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            ))
                            )}
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
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

export default EditSkillsForm;
