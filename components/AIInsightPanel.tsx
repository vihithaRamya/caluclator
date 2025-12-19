
import React from 'react';
import { AIInsight } from '../types';

interface AIInsightPanelProps {
  insight: AIInsight | null;
  isLoading: boolean;
}

export const AIInsightPanel: React.FC<AIInsightPanelProps> = ({ insight, isLoading }) => {
  if (isLoading) {
    return (
      <div className="glass p-8 rounded-[2.5rem] animate-pulse min-h-[400px] flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 bg-indigo-500/20 rounded-full animate-bounce flex items-center justify-center">
          <svg className="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-slate-400 font-medium tracking-wide">Gemini is analyzing...</p>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="glass p-8 rounded-[2.5rem] min-h-[400px] flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 text-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.674a1 1 0 00.908-.588l3.358-7.606A1 1 0 0017.695 7.5H6.305a1 1 0 00-.908 1.306l3.358 7.606a1 1 0 00.908.588z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Math Insights</h2>
        <p className="text-slate-400 max-w-xs mx-auto">
          Perform a calculation or click on history to see step-by-step AI explanations and properties.
        </p>
      </div>
    );
  }

  return (
    <div className="glass p-8 rounded-[2.5rem] shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 block">AI Explanation</span>
          <h2 className="text-2xl font-bold text-white">{insight.explanation}</h2>
        </div>
        <div className="bg-indigo-600/10 p-2 rounded-xl">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Solution Steps</h3>
        <ul className="space-y-4">
          {insight.steps.map((step, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="flex-none w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                {idx + 1}
              </span>
              <p className="text-slate-300 leading-relaxed text-sm">{step}</p>
            </li>
          ))}
        </ul>
      </div>

      {insight.tips.length > 0 && (
        <div className="p-6 bg-slate-900/50 rounded-2xl border border-indigo-500/20">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro Tip
          </h4>
          <ul className="list-disc list-inside space-y-2">
             {insight.tips.map((tip, idx) => (
               <li key={idx} className="text-slate-400 text-xs italic">{tip}</li>
             ))}
          </ul>
        </div>
      )}
    </div>
  );
};
