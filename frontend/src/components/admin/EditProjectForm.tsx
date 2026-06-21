import React, { useState, useEffect } from 'react';
import { updateProject, getProjectById, type UpdateProjectData } from '../../api/projects';
import { FaUpload, FaPlus, FaTimes } from 'react-icons/fa';

interface EditProjectFormProps {
    projectId: string;
    onSuccess?: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ projectId, onSuccess }) => {
    const [formData, setFormData] = useState<Omit<UpdateProjectData, 'imageFile'> & { imageFile: File | null }>({
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
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch project data
    useEffect(() => {
        const fetchProject = async () => {
            try {
                setFetchLoading(true);
                const data = await getProjectById(projectId);
                setFormData({
                    title: data.title,
                    description: data.description,
                    github_link: data.github_link,
                    live_link: data.live_link || '',
                    tech_stacks: data.tech_stacks,
                    imageFile: null,
                });
                setImagePreview(data.image);
            } catch (err) {
                setError('Failed to fetch project data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

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

    const addTechStack = () => {
        if (techInput.trim() && !formData.tech_stacks?.includes(techInput.trim())) {
            setFormData({
                ...formData,
                tech_stacks: [...(formData.tech_stacks || []), techInput.trim()],
            });
            setTechInput('');
        }
    };

    const removeTechStack = (tech: string) => {
        setFormData({
            ...formData,
            tech_stacks: formData.tech_stacks?.filter((t) => t !== tech) || [],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.tech_stacks && formData.tech_stacks.length === 0) {
            setError('Please add at least one technology');
            return;
        }

        try {
            setLoading(true);
            await updateProject(projectId, formData as UpdateProjectData);
            alert('Project updated successfully! 🎉');
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update project');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6 border border-[var(--nav-border-color)] rounded-xl shadow-lg">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                    <p className="text-[var(--nav-text-color)]">Loading project...</p>
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
                        Project Image (Leave blank to keep current)
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
                        {formData.tech_stacks?.map((tech, index) => (
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
                    {loading ? 'Updating Project...' : 'Update Project'}
                </button>
            </form>
        </div>
    );
};

export default EditProjectForm;
