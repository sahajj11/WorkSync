import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, MoreVertical, Calendar, Users } from 'lucide-react';
import CreateProjectModal from "../components/modals/CreateProjectModal.jsx"

export const Overview = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects/my-projects');
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const onProjectCreated = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Overview</h1>
          <p className="text-gray-500 mt-1">Check what's happening across your workspace.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus size={20} /> New Project
        </button>
      </header>

      {/* Grid */}
      {loading ? (
        <div className="text-gray-600">Loading your projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Empty State Action */}
          {projects.length === 0 && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-gray-700 hover:text-gray-400 transition-all"
            >
              <Plus size={32} className="mb-2 opacity-20" />
              <span>Create your first project</span>
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProjectCreated={onProjectCreated}
      />
    </div>
  );
};

// Internal ProjectCard Component for cleanliness
const ProjectCard = ({ project }) => (
  <div className="bg-[#12141a] border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="h-12 w-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 font-bold text-lg">
        {project.name.charAt(0).toUpperCase()}
      </div>
      <button className="text-gray-700 hover:text-white transition">
        <MoreVertical size={20} />
      </button>
    </div>

    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition">
      {project.name}
    </h3>
    <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10">
      {project.description || "No description provided."}
    </p>

    <div className="flex items-center justify-between pt-5 border-t border-gray-800/50">
      <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          {project._count?.tasks || 0} Tasks
        </span>
      </div>
      <div className="flex -space-x-2">
        {/* Mockup of member avatars */}
        <div className="h-7 w-7 rounded-full border-2 border-[#12141a] bg-gray-800 flex items-center justify-center text-[10px] text-white">SR</div>
        <div className="h-7 w-7 rounded-full border-2 border-[#12141a] bg-blue-600 flex items-center justify-center text-[10px] text-white">+1</div>
      </div>
    </div>
  </div>
);