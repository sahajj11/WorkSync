import React from 'react';
import { Briefcase, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';

export const Overview = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Welcome Section */}
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
        <p className="text-gray-500 mt-1">Here's what's happening across your workspaces today.</p>
      </header>

      {/* 2. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Projects" value="12" icon={<Briefcase className="text-blue-500" />} change="+2 this week" />
        <StatCard title="Tasks Completed" value="48" icon={<CheckCircle2 className="text-green-500" />} change="+5 today" />
        <StatCard title="Upcoming Deadlines" value="3" icon={<Clock className="text-yellow-500" />} color="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 3. Recent Projects (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-200">Recent Projects</h2>
            <button className="text-blue-500 text-sm font-medium hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* We will map your real project cards here */}
             <div className="h-32 bg-[#12141a] border border-gray-800 rounded-2xl p-5">
                <p className="text-gray-600 text-sm italic">Project cards will appear here...</p>
             </div>
          </div>
        </div>

        {/* 4. Activity Feed (Right 1/3) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-200">Activity Feed</h2>
          <div className="bg-[#12141a] border border-gray-800 rounded-2xl p-6 min-h-[300px]">
            <p className="text-gray-600 text-sm">No recent activity found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, change, color = "text-white" }) => (
  <div className="bg-[#12141a] border border-gray-800 p-6 rounded-3xl hover:border-gray-700 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-xl border border-white/5">{icon}</div>
      {change && <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">{change}</span>}
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
  </div>
);