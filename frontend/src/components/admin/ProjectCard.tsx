import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Project } from '../../api/projects';

interface ProjectCardProps {
    project: Project;
    onEdit: (id: string) => void;
    onDelete: (id: string, title: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
    return (
        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]">
            {/* Image */}
            <div className="relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--nav-card-1-bg)] to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-[var(--nav-text-color)] mb-2 truncate">
                    {project.title}
                </h3>
                <p className="text-[var(--nav-text-color)] opacity-70 text-sm mb-3 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stacks.slice(0, 3).map((tech, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] text-xs rounded border border-[var(--nav-border-color)]"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech_stacks.length > 3 && (
                        <span className="px-2 py-1 bg-[var(--nav-card-3-bg)] text-[var(--nav-text-color)] text-xs rounded border border-[var(--nav-border-color)]">
                            +{project.tech_stacks.length - 3}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(project._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                    >
                        <FaEdit /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(project._id, project.title)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md"
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
