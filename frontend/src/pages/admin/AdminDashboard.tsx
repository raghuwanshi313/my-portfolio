import { useState } from 'react';
import { FaPlus, FaSignOutAlt, FaEye, FaAward, FaCode, FaCog, FaBriefcase, FaLaptopCode, FaUser } from 'react-icons/fa';
import { useProjects } from '../../hooks/useProjects';
import { useCertifications } from '../../hooks/useCertifications';
import { useSkills } from '../../hooks/useSkills';
import { useExperiences } from '../../hooks/useExperiences';
import { useCodingProfiles } from '../../hooks/useCodingProfiles';
import { usePersonalInfo } from '../../hooks/usePersonalInfo';
import { useAuth } from '../../hooks/useAuth';
import { deleteProject } from '../../api/projects';
import { deleteCertification } from '../../api/certifications';
import { deleteExperience } from '../../api/experiences';
import { deleteCodingProfile } from '../../api/codingProfiles';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import CreateProjectForm from '../../components/admin/CreateProjectForm';
import EditProjectForm from '../../components/admin/EditProjectForm';
import CreateCertificationForm from '../../components/admin/CreateCertificationForm';
import EditCertificationForm from '../../components/admin/EditCertificationForm';
import CreateExperienceForm from '../../components/admin/CreateExperienceForm';
import EditExperienceForm from '../../components/admin/EditExperienceForm';
import CreateCodingProfileForm from '../../components/admin/CreateCodingProfileForm';
import EditCodingProfileForm from '../../components/admin/EditCodingProfileForm';
import EditSkillsForm from '../../components/admin/EditSkillsForm';
import EditPersonalInfoForm from '../../components/admin/EditPersonalInfoForm';
import ProjectCard from '../../components/admin/ProjectCard';
import CertificationCard from '../../components/admin/CertificationCard';
import ExperienceCard from '../../components/admin/ExperienceCard';
import CodingProfileCardAdmin from '../../components/admin/CodingProfileCardAdmin';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { projects, loading, error, refetch } = useProjects();
    const { certifications, loading: certsLoading, error: certsError, refetch: refetchCerts } = useCertifications();
    const { skills, loading: skillsLoading, error: skillsError, refetch: refetchSkills } = useSkills();
    const { experiences, loading: expsLoading, error: expsError, refetch: refetchExperiences } = useExperiences();
    const { codingProfiles, loading: profilesLoading, error: profilesError, refetch: refetchProfiles } = useCodingProfiles();
    const { personalInfo, loading: personalLoading, refetch: refetchPersonalInfo } = usePersonalInfo();
    const [activeTab, setActiveTab] = useState<'projects' | 'certifications' | 'skills' | 'experiences' | 'coding-profiles' | 'personal-info'>('projects');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingProject, setEditingProject] = useState<string | null>(null);
    const [showCreateCertForm, setShowCreateCertForm] = useState(false);
    const [editingCertification, setEditingCertification] = useState<string | null>(null);
    const [showCreateExpForm, setShowCreateExpForm] = useState(false);
    const [editingExperience, setEditingExperience] = useState<string | null>(null);
    const [showCreateProfileForm, setShowCreateProfileForm] = useState(false);
    const [editingProfile, setEditingProfile] = useState<string | null>(null);
    const [editingSkills, setEditingSkills] = useState(false);
    const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            try {
                await logout();
                navigate('/');
            } catch (error) {
                alert('Failed to logout');
            }
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteProject(id);
                alert('Project deleted successfully!');
                refetch();
            } catch (error) {
                alert('Failed to delete project');
            }
        }
    };

    const handleDeleteCertification = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteCertification(id);
                alert('Certification deleted successfully!');
                refetchCerts();
            } catch (error) {
                alert('Failed to delete certification');
            }
        }
    };

    const handleDeleteExperience = async (id: string, companyName: string) => {
        if (confirm(`Are you sure you want to delete experience at "${companyName}"?`)) {
            try {
                await deleteExperience(id);
                alert('Experience deleted successfully!');
                refetchExperiences();
            } catch (error) {
                alert('Failed to delete experience');
            }
        }
    };

    const handleDeleteCodingProfile = async (id: string, platform: string) => {
        if (confirm(`Are you sure you want to delete ${platform} profile?`)) {
            try {
                await deleteCodingProfile(id);
                alert('Coding profile deleted successfully!');
                refetchProfiles();
            } catch (error) {
                alert('Failed to delete coding profile');
            }
        }
    };

    const handleCreateSuccess = () => {
        setShowCreateForm(false);
        refetch();
    };

    const handleEditSuccess = () => {
        setEditingProject(null);
        refetch();
    };

    const handleCreateCertSuccess = () => {
        setShowCreateCertForm(false);
        refetchCerts();
    };

    const handleEditCertSuccess = () => {
        setEditingCertification(null);
        refetchCerts();
    };

    const handleCreateExpSuccess = () => {
        setShowCreateExpForm(false);
        refetchExperiences();
    };

    const handleEditExpSuccess = () => {
        setEditingExperience(null);
        refetchExperiences();
    };

    const handleCreateProfileSuccess = () => {
        setShowCreateProfileForm(false);
        refetchProfiles();
    };

    const handleEditProfileSuccess = () => {
        setEditingProfile(null);
        refetchProfiles();
    };

    const handleEditSkillsSuccess = () => {
        setEditingSkills(false);
        refetchSkills();
    };

    const handleEditPersonalInfoSuccess = () => {
        setEditingPersonalInfo(false);
        refetchPersonalInfo();
    };

    const totalSkillsCount = skills
        ? skills.programming_languages.length +
          skills.frontend.length +
          skills.backend.length +
          skills.databases.length +
          skills.dev_tools.length +
          skills.other.length
        : 0;

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Header */}
            <header className="bg-[var(--nav-base-color)] backdrop-blur-md border-b border-[var(--nav-border-color)] sticky top-0 z-50 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                            <p className="text-[var(--nav-text-color)] opacity-70 mt-1">
                                Welcome back, {user?.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                <FaEye /> View Portfolio
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                    <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-[var(--nav-text-color)] opacity-70 text-sm font-medium mb-2">
                            Total Projects
                        </h3>
                        <p className="text-4xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                            {projects.length}
                        </p>
                    </div>
                    <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-[var(--nav-text-color)] opacity-70 text-sm font-medium mb-2">
                            Total Certifications
                        </h3>
                        <p className="text-4xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                            {certifications.length}
                        </p>
                    </div>
                    <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-[var(--nav-text-color)] opacity-70 text-sm font-medium mb-2">
                            Total Experiences
                        </h3>
                        <p className="text-4xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                            {experiences.length}
                        </p>
                    </div>
                    <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-[var(--nav-text-color)] opacity-70 text-sm font-medium mb-2">
                            Coding Profiles
                        </h3>
                        <p className="text-4xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                            {codingProfiles.length}
                        </p>
                    </div>
                    <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-[var(--nav-text-color)] opacity-70 text-sm font-medium mb-2">
                            Total Skills
                        </h3>
                        <p className="text-4xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                            {totalSkillsCount}
                        </p>
                    </div>
                    <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-[var(--nav-text-color)] opacity-70 text-sm font-medium mb-2">
                            Personal Info
                        </h3>
                        <p className="text-4xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                            {personalInfo?.name ? '✓' : '−'}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex gap-2 border-b border-[var(--nav-border-color)]">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'projects'
                                ? 'text-[var(--nav-text-hover)] border-b-2 border-[var(--nav-text-hover)]'
                                : 'text-[var(--nav-text-color)] opacity-60 hover:opacity-100'
                        }`}
                    >
                        <FaCode /> Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('certifications')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'certifications'
                                ? 'text-[var(--nav-text-hover)] border-b-2 border-[var(--nav-text-hover)]'
                                : 'text-[var(--nav-text-color)] opacity-60 hover:opacity-100'
                        }`}
                    >
                        <FaAward /> Certifications
                    </button>
                    <button
                        onClick={() => setActiveTab('experiences')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'experiences'
                                ? 'text-[var(--nav-text-hover)] border-b-2 border-[var(--nav-text-hover)]'
                                : 'text-[var(--nav-text-color)] opacity-60 hover:opacity-100'
                        }`}
                    >
                        <FaBriefcase /> Experiences
                    </button>
                    <button
                        onClick={() => setActiveTab('coding-profiles')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'coding-profiles'
                                ? 'text-[var(--nav-text-hover)] border-b-2 border-[var(--nav-text-hover)]'
                                : 'text-[var(--nav-text-color)] opacity-60 hover:opacity-100'
                        }`}
                    >
                        <FaLaptopCode /> Coding Profiles
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'skills'
                                ? 'text-[var(--nav-text-hover)] border-b-2 border-[var(--nav-text-hover)]'
                                : 'text-[var(--nav-text-color)] opacity-60 hover:opacity-100'
                        }`}
                    >
                        <FaCog /> Skills
                    </button>
                    <button
                        onClick={() => setActiveTab('personal-info')}
                        className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'personal-info'
                                ? 'text-[var(--nav-text-hover)] border-b-2 border-[var(--nav-text-hover)]'
                                : 'text-[var(--nav-text-color)] opacity-60 hover:opacity-100'
                        }`}
                    >
                        <FaUser /> Personal Info
                    </button>
                </div>

                {/* Create Project Button */}
                {activeTab === 'projects' && !showCreateForm && !editingProject && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg"
                        >
                            <FaPlus /> Create New Project
                        </button>
                    </div>
                )}

                {/* Create Certification Button */}
                {activeTab === 'certifications' && !showCreateCertForm && !editingCertification && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowCreateCertForm(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg"
                        >
                            <FaPlus /> Create New Certification
                        </button>
                    </div>
                )}

                {/* Create Experience Button */}
                {activeTab === 'experiences' && !showCreateExpForm && !editingExperience && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowCreateExpForm(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg"
                        >
                            <FaPlus /> Add New Experience
                        </button>
                    </div>
                )}

                {/* Create Coding Profile Button */}
                {activeTab === 'coding-profiles' && !showCreateProfileForm && !editingProfile && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowCreateProfileForm(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg"
                        >
                            <FaPlus /> Add Coding Profile
                        </button>
                    </div>
                )}

                {/* Create Form */}
                {showCreateForm && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Create New Project
                            </h2>
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <CreateProjectForm onSuccess={handleCreateSuccess} />
                    </div>
                )}

                {/* Edit Form */}
                {editingProject && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Edit Project
                            </h2>
                            <button
                                onClick={() => setEditingProject(null)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <EditProjectForm
                            projectId={editingProject}
                            onSuccess={handleEditSuccess}
                        />
                    </div>
                )}

                {/* Projects List */}
                {activeTab === 'projects' && !showCreateForm && !editingProject && (
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--nav-text-color)] mb-6">
                            Manage Projects
                        </h2>

                        {loading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                                <p className="text-[var(--nav-text-color)]">Loading projects...</p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                                Error: {error}
                            </div>
                        )}

                        {!loading && !error && projects.length === 0 && (
                            <div className="text-center py-12 bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl">
                                <p className="text-[var(--nav-text-color)] text-lg mb-4">
                                    No projects yet. Create your first project!
                                </p>
                            </div>
                        )}

                        {!loading && !error && projects.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                        onEdit={setEditingProject}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Create Certification Form */}
                {showCreateCertForm && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Create New Certification
                            </h2>
                            <button
                                onClick={() => setShowCreateCertForm(false)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <CreateCertificationForm onSuccess={handleCreateCertSuccess} />
                    </div>
                )}

                {/* Edit Certification Form */}
                {editingCertification && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Edit Certification
                            </h2>
                            <button
                                onClick={() => setEditingCertification(null)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <EditCertificationForm
                            certificationId={editingCertification}
                            onSuccess={handleEditCertSuccess}
                        />
                    </div>
                )}

                {/* Certifications List */}
                {activeTab === 'certifications' && !showCreateCertForm && !editingCertification && (
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--nav-text-color)] mb-6">
                            Manage Certifications
                        </h2>

                        {certsLoading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                                <p className="text-[var(--nav-text-color)]">Loading certifications...</p>
                            </div>
                        )}

                        {certsError && (
                            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                                Error: {certsError}
                            </div>
                        )}

                        {!certsLoading && !certsError && certifications.length === 0 && (
                            <div className="text-center py-12 bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl">
                                <p className="text-[var(--nav-text-color)] text-lg mb-4">
                                    No certifications yet. Create your first certification!
                                </p>
                            </div>
                        )}

                        {!certsLoading && !certsError && certifications.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certifications.map((cert) => (
                                    <CertificationCard
                                        key={cert._id}
                                        certification={cert}
                                        onEdit={setEditingCertification}
                                        onDelete={handleDeleteCertification}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Create Experience Form */}
                {showCreateExpForm && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Add New Experience
                            </h2>
                            <button
                                onClick={() => setShowCreateExpForm(false)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <CreateExperienceForm onSuccess={handleCreateExpSuccess} />
                    </div>
                )}

                {/* Edit Experience Form */}
                {editingExperience && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Edit Experience
                            </h2>
                            <button
                                onClick={() => setEditingExperience(null)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <EditExperienceForm
                            experienceId={editingExperience}
                            onSuccess={handleEditExpSuccess}
                        />
                    </div>
                )}

                {/* Experiences List */}
                {activeTab === 'experiences' && !showCreateExpForm && !editingExperience && (
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--nav-text-color)] mb-6">
                            Manage Experiences
                        </h2>

                        {expsLoading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                                <p className="text-[var(--nav-text-color)]">Loading experiences...</p>
                            </div>
                        )}

                        {expsError && (
                            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                                Error: {expsError}
                            </div>
                        )}

                        {!expsLoading && !expsError && experiences.length === 0 && (
                            <div className="text-center py-12 bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl">
                                <p className="text-[var(--nav-text-color)] text-lg mb-4">
                                    No experiences yet. Add your first experience!
                                </p>
                            </div>
                        )}

                        {!expsLoading && !expsError && experiences.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {experiences.map((exp) => (
                                    <ExperienceCard
                                        key={exp._id}
                                        experience={exp}
                                        onEdit={setEditingExperience}
                                        onDelete={handleDeleteExperience}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Create Coding Profile Form */}
                {showCreateProfileForm && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Add Coding Profile
                            </h2>
                            <button
                                onClick={() => setShowCreateProfileForm(false)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <CreateCodingProfileForm onSuccess={handleCreateProfileSuccess} />
                    </div>
                )}

                {/* Edit Coding Profile Form */}
                {editingProfile && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                Edit Coding Profile
                            </h2>
                            <button
                                onClick={() => setEditingProfile(null)}
                                className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                            >
                                Cancel
                            </button>
                        </div>
                        <EditCodingProfileForm
                            profileId={editingProfile}
                            onSuccess={handleEditProfileSuccess}
                        />
                    </div>
                )}

                {/* Coding Profiles List */}
                {activeTab === 'coding-profiles' && !showCreateProfileForm && !editingProfile && (
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--nav-text-color)] mb-6">
                            Manage Coding Profiles
                        </h2>

                        {profilesLoading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                                <p className="text-[var(--nav-text-color)]">Loading coding profiles...</p>
                            </div>
                        )}

                        {profilesError && (
                            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                                Error: {profilesError}
                            </div>
                        )}

                        {!profilesLoading && !profilesError && codingProfiles.length === 0 && (
                            <div className="text-center py-12 bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl">
                                <p className="text-[var(--nav-text-color)] text-lg mb-4">
                                    No coding profiles yet. Add your first profile!
                                </p>
                            </div>
                        )}

                        {!profilesLoading && !profilesError && codingProfiles.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {codingProfiles.map((profile) => (
                                    <CodingProfileCardAdmin
                                        key={profile._id}
                                        profile={profile}
                                        onEdit={setEditingProfile}
                                        onDelete={handleDeleteCodingProfile}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Skills Management */}
                {activeTab === 'skills' && (
                    <div>
                        {!editingSkills ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-[var(--nav-text-color)]">
                                        Manage Skills
                                    </h2>
                                    <button
                                        onClick={() => setEditingSkills(true)}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg"
                                    >
                                        <FaCog /> Edit Skills
                                    </button>
                                </div>

                                {skillsLoading && (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                                        <p className="text-[var(--nav-text-color)]">Loading skills...</p>
                                    </div>
                                )}

                                {skillsError && (
                                    <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                                        Error: {skillsError}
                                    </div>
                                )}

                                {!skillsLoading && !skillsError && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-[var(--nav-text-color)] mb-3 flex items-center gap-2">
                                                💻 Programming Languages ({skills.programming_languages.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.programming_languages.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-[var(--nav-card-2-bg)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.programming_languages.length === 0 && (
                                                    <p className="text-[var(--nav-text-color)] opacity-50 italic">No skills added</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-[var(--nav-text-color)] mb-3 flex items-center gap-2">
                                                🎨 Frontend ({skills.frontend.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.frontend.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-[var(--nav-card-2-bg)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.frontend.length === 0 && (
                                                    <p className="text-[var(--nav-text-color)] opacity-50 italic">No skills added</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-[var(--nav-text-color)] mb-3 flex items-center gap-2">
                                                ⚙️ Backend ({skills.backend.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.backend.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-[var(--nav-card-2-bg)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.backend.length === 0 && (
                                                    <p className="text-[var(--nav-text-color)] opacity-50 italic">No skills added</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-[var(--nav-text-color)] mb-3 flex items-center gap-2">
                                                🗄️ Databases ({skills.databases.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.databases.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-[var(--nav-card-2-bg)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.databases.length === 0 && (
                                                    <p className="text-[var(--nav-text-color)] opacity-50 italic">No skills added</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-[var(--nav-text-color)] mb-3 flex items-center gap-2">
                                                🛠️ Development Tools ({skills.dev_tools.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.dev_tools.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-[var(--nav-card-2-bg)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.dev_tools.length === 0 && (
                                                    <p className="text-[var(--nav-text-color)] opacity-50 italic">No skills added</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-[var(--nav-text-color)] mb-3 flex items-center gap-2">
                                                📦 Other ({skills.other.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.other.map((skill) => (
                                                    <span key={skill} className="px-3 py-1 bg-[var(--nav-card-2-bg)] border border-[var(--nav-border-color)] rounded-lg text-[var(--nav-text-color)] text-sm">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.other.length === 0 && (
                                                    <p className="text-[var(--nav-text-color)] opacity-50 italic">No skills added</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                        Edit Skills
                                    </h2>
                                    <button
                                        onClick={() => setEditingSkills(false)}
                                        className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <EditSkillsForm onSuccess={handleEditSkillsSuccess} />
                            </>
                        )}
                    </div>
                )}

                {/* Personal Info Tab */}
                {activeTab === 'personal-info' && (
                    <div>
                        {!editingPersonalInfo ? (
                            <>
                                {personalLoading ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                                        <p className="text-[var(--nav-text-color)]">Loading personal info...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6 flex justify-between items-center">
                                            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                                Personal Information
                                            </h2>
                                            <button
                                                onClick={() => setEditingPersonalInfo(true)}
                                                className="px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg"
                                            >
                                                Edit Personal Info
                                            </button>
                                        </div>

                                        {personalInfo ? (
                                            <div className="space-y-6">
                                                {/* Basic Info Card */}
                                                <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg">
                                                    <div className="flex items-start gap-6">
                                                        {personalInfo.profile_image && (
                                                            <img
                                                                src={personalInfo.profile_image}
                                                                alt={personalInfo.name}
                                                                className="w-32 h-32 rounded-full object-cover border-4 border-[var(--nav-border-color)]"
                                                            />
                                                        )}
                                                        <div className="flex-1 space-y-3">
                                                            <h3 className="text-2xl font-bold text-[var(--nav-text-color)]">
                                                                {personalInfo.name}
                                                            </h3>
                                                            <p className="text-lg text-[var(--nav-text-hover)] font-medium">
                                                                {personalInfo.tagline}
                                                            </p>
                                                            <p className="text-[var(--nav-text-color)] opacity-70 leading-relaxed">
                                                                {personalInfo.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contact Info Card */}
                                                <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg">
                                                    <h3 className="text-xl font-bold text-[var(--nav-text-color)] mb-4">
                                                        Contact Information
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">Email</p>
                                                            <p className="text-[var(--nav-text-color)] font-medium">{personalInfo.email}</p>
                                                        </div>
                                                        {personalInfo.phone && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">Phone</p>
                                                                <p className="text-[var(--nav-text-color)] font-medium">{personalInfo.phone}</p>
                                                            </div>
                                                        )}
                                                        {personalInfo.location && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">Location</p>
                                                                <p className="text-[var(--nav-text-color)] font-medium">{personalInfo.location}</p>
                                                            </div>
                                                        )}
                                                        {personalInfo.cv && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">CV/Resume</p>
                                                                <a
                                                                    href={personalInfo.cv}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[var(--nav-text-hover)] font-medium hover:underline"
                                                                >
                                                                    View CV
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Social Links Card */}
                                                <div className="bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl p-6 shadow-lg">
                                                    <h3 className="text-xl font-bold text-[var(--nav-text-color)] mb-4">
                                                        Social Links
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {personalInfo.social_links?.github && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">GitHub</p>
                                                                <a
                                                                    href={personalInfo.social_links.github}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[var(--nav-text-hover)] font-medium hover:underline break-all"
                                                                >
                                                                    {personalInfo.social_links.github}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {personalInfo.social_links?.linkedin && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">LinkedIn</p>
                                                                <a
                                                                    href={personalInfo.social_links.linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[var(--nav-text-hover)] font-medium hover:underline break-all"
                                                                >
                                                                    {personalInfo.social_links.linkedin}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {personalInfo.social_links?.twitter && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">Twitter</p>
                                                                <a
                                                                    href={personalInfo.social_links.twitter}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[var(--nav-text-hover)] font-medium hover:underline break-all"
                                                                >
                                                                    {personalInfo.social_links.twitter}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {personalInfo.social_links?.instagram && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">Instagram</p>
                                                                <a
                                                                    href={personalInfo.social_links.instagram}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[var(--nav-text-hover)] font-medium hover:underline break-all"
                                                                >
                                                                    {personalInfo.social_links.instagram}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {personalInfo.social_links?.portfolio && (
                                                            <div>
                                                                <p className="text-sm text-[var(--nav-text-color)] opacity-60 mb-1">Portfolio/Other</p>
                                                                <a
                                                                    href={personalInfo.social_links.portfolio}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[var(--nav-text-hover)] font-medium hover:underline break-all"
                                                                >
                                                                    {personalInfo.social_links.portfolio}
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-[var(--nav-card-1-bg)] border border-[var(--nav-border-color)] rounded-xl">
                                                <p className="text-[var(--nav-text-color)] opacity-60 mb-4">
                                                    No personal information found
                                                </p>
                                                <button
                                                    onClick={() => setEditingPersonalInfo(true)}
                                                    className="px-6 py-3 bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] text-white font-semibold rounded-lg hover:shadow-xl transition-all shadow-lg"
                                                >
                                                    Add Personal Info
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--nav-text-hover)] to-[var(--bg-rays-color)] bg-clip-text text-transparent">
                                        Edit Personal Info
                                    </h2>
                                    <button
                                        onClick={() => setEditingPersonalInfo(false)}
                                        className="px-4 py-2 bg-[var(--nav-card-2-bg)] text-[var(--nav-text-color)] rounded-lg hover:bg-[var(--nav-card-3-bg)] transition-colors border border-[var(--nav-border-color)]"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <EditPersonalInfoForm onSuccess={handleEditPersonalInfoSuccess} />
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
