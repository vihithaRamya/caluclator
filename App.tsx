
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CalculatorUI } from './components/CalculatorUI';
import { Sidebar } from './components/Sidebar';
import { AIInsightPanel } from './components/AIInsightPanel';
import { Calculation, AIInsight } from './types';
import { mathService } from './services/geminiService';

const App: React.FC = () => {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [activeInsight, setActiveInsight] = useState<AIInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const addCalculation = (expression: string, result: string) => {
    const newCalc: Calculation = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: Date.now(),
    };
    setHistory(prev => [newCalc, ...prev].slice(0, 50));
  };

  const getAIExplanation = async (calc: Calculation) => {
    setIsAiLoading(true);
    setActiveInsight(null);
    try {
      const insight = await mathService.solveAndExplain(calc.expression, calc.result);
      setActiveInsight(insight);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleWordProblem = async (problem: string) => {
    setIsAiLoading(true);
    setActiveInsight(null);
    try {
      const data = await mathService.answerWordProblem(problem);
      addCalculation(problem, data.result);
      setActiveInsight({
        explanation: data.explanation,
        steps: data.steps,
        tips: []
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar for History (Desktop) / Toggleable (Mobile) */}
      <Sidebar 
        history={history} 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        onSelect={getAIExplanation}
      />

      {/* Main Calculator Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto">
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">G</div>
            <h1 className="text-xl font-bold tracking-tight">Gemini Math Studio</h1>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="md:hidden glass p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </header>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-20">
          {/* Calculator Section */}
          <div className="flex flex-col gap-6">
            <CalculatorUI onCalculate={addCalculation} />
            
            <div className="glass p-6 rounded-3xl">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Solve Word Problem</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('problem') as HTMLInputElement;
                if (input.value) {
                  handleWordProblem(input.value);
                  input.value = '';
                }
              }} className="flex gap-2">
                <input 
                  name="problem"
                  placeholder="e.g., If I have 3 apples and..."
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>

          {/* AI Insight Section */}
          <div className="sticky top-24">
            <AIInsightPanel insight={activeInsight} isLoading={isAiLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
