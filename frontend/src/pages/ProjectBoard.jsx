import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../services/api.js"
import { Plus, Users, MoreVertical, LayoutGrid } from 'lucide-react';

export const ProjectBoard = () => {
  const { projectId } = useParams(); // Grabs the ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const { data } = await api.get(`/projects/${projectId}`);
        setProject(data);
      } catch (err) {
        console.error("Error loading board:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [projectId]);

  if (loading) return <div className="p-10 text-gray-500">Loading workspace...</div>;

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      {/* Board Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
             <LayoutGrid size={16} />
             <span className="text-xs font-bold uppercase tracking-widest">Project Workspace</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{project?.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl border border-gray-800 transition">
            <Users size={18} /> Invite
          </button>
        </div>
      </header>

      {/* Kanban Board Layout */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
        <Column title="To Do" tasks={project?.tasks?.filter(t => t.status === 'TODO')} color="bg-gray-500" />
        <Column title="In Progress" tasks={project?.tasks?.filter(t => t.status === 'IN_PROGRESS')} color="bg-blue-500" />
        <Column title="Done" tasks={project?.tasks?.filter(t => t.status === 'DONE')} color="bg-green-500" />
      </div>
    </div>
  );
};

const Column = ({ title, tasks = [], color }) => (
  <div className="w-80 shrink-0 flex flex-col bg-[#12141a]/50 rounded-2xl border border-gray-800/50 p-4">
    <div className="flex justify-between items-center mb-5 px-1">
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${color}`} />
        <h3 className="font-bold text-gray-200">{title}</h3>
        <span className="bg-white/5 text-gray-500 px-2 py-0.5 rounded text-[10px]">{tasks.length}</span>
      </div>
      <button className="text-gray-600 hover:text-white transition"><Plus size={18} /></button>
    </div>

    <div className="flex-1 space-y-4 overflow-y-auto pr-1">
      {tasks.map(task => (
        <div key={task.id} className="bg-[#1c1f26] border border-gray-800 p-4 rounded-xl hover:border-blue-500/30 transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded uppercase">Task</span>
            <MoreVertical size={14} className="text-gray-700 group-hover:text-gray-400" />
          </div>
          <h4 className="text-gray-200 text-sm font-medium leading-snug">{task.title}</h4>
        </div>
      ))}
      
      <button className="w-full py-2 border border-dashed border-gray-800 rounded-xl text-gray-600 text-xs hover:border-gray-700 hover:text-gray-400 transition">
        + Add Task
      </button>
    </div>
  </div>
);