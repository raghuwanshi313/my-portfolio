import React, { useState } from 'react';
import { createProject, type CreateProjectData } from '../../api/projects';
import { FaUpload, FaPlus, FaTimes } from 'react-icons/fa';

const CreateProjectForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<Omit<CreateProjectData, 'imageFile'> & { imageFile: File | null }>({
        title: '',
        description: '',
        github_link: '',
        live_link: '',
        tech_stacks: [],
        imageFile: null,
    });
    const [techInput, setTechInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, imageFile: file });
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTechStack = () => {
        if (techInput.trim() && !formData.tech_stacks.includes(techInput.trim())) {
            setFormData({
                ...formData,
                tech_stacks: [...formData.tech_stacks, techInput.trim()],
            });
            setTechInput('');
        }
    };

    const removeTechStack = (tech: string) => {
        setFormData({
            ...formData,
            tech_stacks: formData.tech_stacks.filter((t) => t !== tech),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.imageFile) {
            setError('Please upload a project image');
            return;
        }

        if (formData.tech_stacks.length === 0) {
            setError('Please add at least one technology');
            return;
        }

        try {
            setLoading(true);
            await createProject(formData as CreateProjectData);
            
            // Reset form
            setFormData({
                title: '',
                description: '',
                github_link: '',
                live_link: '',
                tech_stacks: [],
                imageFile: null,
            });
            setImagePreview(null);
            
            alert('Project created successfully! 🎉');
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 border border-[var(--nav-border-color)] rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-[var(--nav-text-color)] mb-6">
                Create New Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Title */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Project Title *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="Enter project title"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Description *
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)] min-h-[120px]"
                        placeholder="Enter project description"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Project Image *
                    </label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-6 py-3 bg-[var(--nav-text-hover)] text-white font-medium rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                            <FaUpload />
                            Choose Image
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

                {/* GitHub Link */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        GitHub Link *
                    </label>
                    <input
                        type="url"
                        value={formData.github_link}
                        onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="https://github.com/username/repo"
                        required
                    />
                </div>

                {/* Live Link */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Live Demo Link (Optional)
                    </label>
                    <input
                        type="url"
                        value={formData.live_link}
                        onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                        className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                        placeholder="https://example.com"
                    />
                </div>

                {/* Tech Stack */}
                <div>
                    <label className="block text-[var(--nav-text-color)] font-medium mb-2">
                        Tech Stack *
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                            className="flex-1 px-4 py-3 bg-[var(--bg-color)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--nav-text-hover)]"
                            placeholder="e.g., React, Node.js"
                        />
                        <button
                            type="button"
                            onClick={addTechStack}
                            className="px-6 py-3 bg-[var(--nav-text-hover)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            <FaPlus /> Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.tech_stacks.map((tech, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--nav-text-hover)] text-white rounded-lg"
                            >
                                {tech}
                                <button
                                    type="button"
                                    onClick={() => removeTechStack(tech)}
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
                    {loading ? 'Creating Project...' : 'Create Project'}
                </button>
            </form>
        </div>
    );
};

export default CreateProjectForm;
