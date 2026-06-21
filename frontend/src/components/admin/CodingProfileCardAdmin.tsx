import { FaEdit, FaTrash } from 'react-icons/fa';
import type { CodingProfile } from '../../api/codingProfiles';
import { getPlatformConfig } from '../../utils/platformIcons';

interface CodingProfileCardProps {
    profile: CodingProfile;
    onEdit: (id: string) => void;
    onDelete: (id: string, platform: string) => void;
}

const CodingProfileCardAdmin = ({ profile, onEdit, onDelete }: CodingProfileCardProps) => {
    const platformConfig = getPlatformConfig(profile.platform);

    return (
        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: platformConfig.color }}
                    >
                        {platformConfig.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-[var(--nav-text-color)] truncate">
                            {profile.platform}
                        </h3>
                        <p className="text-sm text-[var(--nav-text-hover)] font-semibold truncate">
                            @{profile.username}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 ml-2">
                    <button
                        onClick={() => onEdit(profile._id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => onDelete(profile._id, profile.platform)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="Delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-4">
                {profile.rank && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--nav-text-color)] opacity-70">Rank:</span>
                        <span className="text-sm font-semibold text-[var(--nav-text-color)]">{profile.rank}</span>
                    </div>
                )}
                {profile.rating !== undefined && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--nav-text-color)] opacity-70">Rating:</span>
                        <span className="text-sm font-semibold text-[var(--nav-text-color)]">{profile.rating}</span>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--nav-text-color)] opacity-70">Problems Solved:</span>
                    <span className="text-sm font-semibold text-[var(--nav-text-color)]">{profile.question_count}</span>
                </div>
            </div>

            {/* Profile Link */}
            <a
                href={profile.profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 bg-[var(--nav-text-hover)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
                View Profile →
            </a>
        </div>
    );
};

export default CodingProfileCardAdmin;
