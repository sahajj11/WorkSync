import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../services/api.js";
import { Plus, Users, Search, MoreHorizontal, AlignLeft } from 'lucide-react';

export const ProjectBoard = () => {
  const { projectId } = useParams();
  const [boardData, setBoardData] = useState({ name: "Project", tasks: [], members: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const { data } = await api.get(`/tasks/get-tasks/${projectId}`);
        console.log("Project ID:", projectId);

        console.log(data)
        // LOGIC FIX: Check if data is an array (tasks) or an object (project)
        if (Array.isArray(data)) {
          setBoardData(prev => ({ ...prev, tasks: data }));
        } else if (data.tasks) {
          setBoardData(data);
        } else if (data.id && data.title) {
          // If the API returns a single task object (like the JSON you shared)
          setBoardData(prev => ({ ...prev, tasks: [data] }));
        }
      } catch (err) {
        console.error("Error loading board:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [projectId]);

  if (loading) return <div className="p-10 text-gray-500 font-medium bg-[#090a0c] h-screen">Loading Jira Workspace...</div>;

  return (
    <div className="h-screen flex flex-col bg-[#090a0c]">
      {/* Jira Breadcrumbs & Header */}
      <header className="px-6 py-4 space-y-4">
        <div className="flex items-center text-xs text-gray-500 gap-2">
          <span>Projects</span> / <span>{boardData.name}</span> / <span className="text-gray-300">Kanban Board</span>
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">{boardData.name} board</h1>
          <div className="flex items-center gap-2">
            <button className="bg-white/5 hover:bg-white/10 p-2 rounded-md border border-gray-800 transition text-gray-300">
              <Plus size={18} />
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-xs font-bold px-3 py-2 rounded-md border border-gray-800 text-gray-300 uppercase">
              Complete Sprint
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              className="bg-[#12141a] border border-gray-800 rounded-md py-1.5 pl-9 pr-4 text-sm text-gray-300 outline-none focus:border-blue-500 transition w-40"
              placeholder="Search board"
            />
          </div>
          <div className="flex -space-x-2">
            {boardData.members?.map((m, i) => (
              <div key={i} title={m.user?.name} className="h-8 w-8 rounded-full border-2 border-[#090a0c] bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white cursor-pointer hover:z-10 transition-transform hover:-translate-y-1">
                {m.user?.name?.charAt(0) || "U"}
              </div>
            ))}
            <button className="h-8 w-8 rounded-full border-2 border-[#090a0c] bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 transition">
              <Users size={12} />
            </button>
          </div>
        </div>
      </header>

      {/* Kanban Columns */}
      <div className="flex-1 flex gap-4 overflow-x-auto p-6 custom-scrollbar">
        <JiraColumn 
          title="To Do" 
          tasks={boardData.tasks?.filter(t => t.status?.toUpperCase() === 'TODO')} 
        />
        <JiraColumn 
          title="In Progress" 
          tasks={boardData.tasks?.filter(t => t.status?.toUpperCase() === 'IN_PROGRESS' || t.status?.toUpperCase() === 'IN PROGRESS')} 
        />
        <JiraColumn 
          title="Done" 
          tasks={boardData.tasks?.filter(t => t.status?.toUpperCase() === 'DONE')} 
          isDone 
        />
      </div>
    </div>
  );
};

const JiraColumn = ({ title, tasks = [], isDone }) => (
  <div className="w-[320px] shrink-0 bg-[#12141a] rounded-lg flex flex-col h-fit max-h-full border border-gray-800/50">
    <div className="p-4 flex justify-between items-center">
      <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
        {title} <span className="ml-2 bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">{tasks.length}</span>
      </h3>
      <MoreHorizontal size={14} className="text-gray-600 cursor-pointer hover:text-gray-400" />
    </div>

    <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-3">
      {tasks.length > 0 ? (
        tasks.map((task, idx) => (
          <div key={task.id} className="bg-[#1c1f26] hover:bg-[#252932] border border-gray-800 rounded-lg p-4 shadow-sm transition-all cursor-pointer group hover:border-gray-600">
            <p className={`text-sm mb-4 leading-relaxed ${isDone ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
              {task.title}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlignLeft size={12} className="text-gray-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  {task.priority || 'Medium'}
                </span>
              </div>
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white shadow-lg">
                {/* Initial logic */}
                SR
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 border-2 border-dashed border-gray-800 rounded-lg text-center text-[11px] text-gray-600 italic">
          No tasks in this stage
        </div>
      )}
      
      <button className="w-full text-left px-3 py-2 text-gray-500 hover:bg-white/5 rounded-md text-xs font-medium flex items-center gap-2 transition mt-2">
        <Plus size={14} /> Create issue
      </button>
    </div>
  </div>
);