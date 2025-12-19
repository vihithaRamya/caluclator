
import React from 'react';
import { Calculation } from '../types';

interface SidebarProps {
  history: Calculation[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (calc: Calculation) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ history, isOpen, onClose, onSelect }) => {
  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-40 w-80 glass border-r border-slate-800/50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </h2>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {history.length === 0 ? (
            <div className="text-slate-500 text-sm italic text-center py-10">
              No recent calculations
            </div>
          ) : (
            history.map(calc => (
              <button
                key={calc.id}
                onClick={() => onSelect(calc)}
                className="w-full text-left glass p-4 rounded-2xl hover:bg-slate-700/50 group transition-all"
              >
                <div className="text-xs text-slate-500 mb-1 font-mono">{calc.expression}</div>
                <div className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {calc.result}
                </div>
                <div className="mt-2 text-[10px] text-indigo-500/50 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  See AI Insight →
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
