import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Certification } from '../../api/certifications';

interface CertificationCardProps {
    certification: Certification;
    onEdit: (id: string) => void;
    onDelete: (id: string, name: string) => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification, onEdit, onDelete }) => {
    return (
        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]">
            {/* Image */}
            <div className="relative">
                <img
                    src={certification.image}
                    alt={certification.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--nav-card-1-bg)] to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold text-[var(--nav-text-color)] mb-2 truncate">
                    {certification.name}
                </h3>
                <p className="text-[var(--nav-text-color)] opacity-70 text-sm mb-1">
                    <span className="font-medium">Issued by:</span> {certification.issued_by}
                </p>
                <p className="text-[var(--nav-text-color)] opacity-70 text-sm mb-3">
                    <span className="font-medium">Date:</span> {new Date(certification.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {certification.skills.slice(0, 3).map((skill, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] text-xs rounded border border-[var(--nav-border-color)]"
                        >
                            {skill}
                        </span>
                    ))}
                    {certification.skills.length > 3 && (
                        <span className="px-2 py-1 bg-[var(--nav-card-3-bg)] text-[var(--nav-text-color)] text-xs rounded border border-[var(--nav-border-color)]">
                            +{certification.skills.length - 3}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(certification._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                    >
                        <FaEdit /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(certification._id, certification.name)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md"
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificationCard;
