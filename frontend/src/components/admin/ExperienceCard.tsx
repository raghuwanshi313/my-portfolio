import { FaEdit, FaTrash, FaBriefcase } from 'react-icons/fa';
import type { Experience } from '../../api/experiences';

interface ExperienceCardProps {
    experience: Experience;
    onEdit: (id: string) => void;
    onDelete: (id: string, companyName: string) => void;
}

const ExperienceCard = ({ experience, onEdit, onDelete }: ExperienceCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const getDuration = () => {
        const start = formatDate(experience.joining_date);
        const end = experience.is_current ? 'Present' : experience.leaving_date ? formatDate(experience.leaving_date) : 'Present';
        return `${start} - ${end}`;
    };

    return (
        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                    {experience.company_logo ? (
                        <img
                            src={experience.company_logo}
                            alt={experience.company_name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[var(--nav-border-color)]"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-[var(--nav-text-hover)] flex items-center justify-center">
                            <FaBriefcase className="text-white text-xl" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[var(--nav-text-color)] truncate">
                            {experience.company_name}
                        </h3>
                        <p className="text-sm text-[var(--nav-text-hover)] font-semibold">
                            {experience.role}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 ml-2">
                    <button
                        onClick={() => onEdit(experience._id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(experience._id, experience.company_name)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="Delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {/* Duration and Location */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] text-xs font-medium rounded-full">
                    📅 {getDuration()}
                </span>
                {experience.location && (
                    <span className="px-3 py-1 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] text-xs font-medium rounded-full">
                        📍 {experience.location}
                    </span>
                )}
                {experience.is_current && (
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                        Current
                    </span>
                )}
            </div>

            {/* Description */}
            <p className="text-[var(--nav-text-color)] opacity-70 text-sm mb-4 line-clamp-3">
                {experience.description}
            </p>

            {/* Achievements */}
            {experience.achievements.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[var(--nav-text-color)] mb-2">
                        Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                        {experience.achievements.slice(0, 2).map((achievement, index) => (
                            <li key={index} className="text-[var(--nav-text-color)] opacity-70 text-xs flex items-start gap-2">
                                <span className="text-[var(--nav-text-hover)] mt-0.5">•</span>
                                <span className="line-clamp-1">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                    {experience.achievements.length > 2 && (
                        <p className="text-xs text-[var(--nav-text-color)] opacity-50 mt-1">
                            +{experience.achievements.length - 2} more
                        </p>
                    )}
                </div>
            )}

            {/* Tech Stack */}
            {experience.tech_stack.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-[var(--nav-text-color)] mb-2">
                        Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {experience.tech_stack.slice(0, 5).map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-[var(--nav-hover-bg)] border border-[var(--nav-border-color)] text-[var(--nav-text-color)] text-xs rounded"
                            >
                                {tech}
                            </span>
                        ))}
                        {experience.tech_stack.length > 5 && (
                            <span className="px-2 py-1 text-[var(--nav-text-color)] opacity-50 text-xs">
                                +{experience.tech_stack.length - 5}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceCard;
