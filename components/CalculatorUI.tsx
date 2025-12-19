
import React, { useState, useEffect } from 'react';

interface CalculatorUIProps {
  onCalculate: (expr: string, res: string) => void;
}

export const CalculatorUI: React.FC<CalculatorUIProps> = ({ onCalculate }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleInput = (val: string) => {
    if (hasCalculated) {
      if (['+', '-', '*', '/', '%'].includes(val)) {
        setExpression(display + ' ' + val + ' ');
        setDisplay('0');
      } else {
        setExpression(val);
        setDisplay(val);
      }
      setHasCalculated(false);
      return;
    }

    if (display === '0' && !['.', '+', '-', '*', '/', '%'].includes(val)) {
      setDisplay(val);
      setExpression(expression + val);
    } else {
      setDisplay(display + val);
      setExpression(expression + val);
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setHasCalculated(false);
  };

  const calculate = () => {
    try {
      // Basic math safety check: allow only digits and math operators
      // Replacing '×' and '÷' if we used those UI symbols
      const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
      
      // Using Function constructor for a simple, isolated expression evaluator
      const result = new Function(`return ${sanitized}`)();
      const resultStr = Number.isFinite(result) ? result.toString() : 'Error';
      
      setDisplay(resultStr);
      onCalculate(expression, resultStr);
      setHasCalculated(true);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const buttons = [
    { label: 'C', onClick: clear, type: 'special' },
    { label: '(', onClick: () => handleInput('('), type: 'operator' },
    { label: ')', onClick: () => handleInput(')'), type: 'operator' },
    { label: '/', onClick: () => handleInput('/'), type: 'operator' },
    
    { label: '7', onClick: () => handleInput('7'), type: 'num' },
    { label: '8', onClick: () => handleInput('8'), type: 'num' },
    { label: '9', onClick: () => handleInput('9'), type: 'num' },
    { label: '*', onClick: () => handleInput('*'), type: 'operator' },
    
    { label: '4', onClick: () => handleInput('4'), type: 'num' },
    { label: '5', onClick: () => handleInput('5'), type: 'num' },
    { label: '6', onClick: () => handleInput('6'), type: 'num' },
    { label: '-', onClick: () => handleInput('-'), type: 'operator' },
    
    { label: '1', onClick: () => handleInput('1'), type: 'num' },
    { label: '2', onClick: () => handleInput('2'), type: 'num' },
    { label: '3', onClick: () => handleInput('3'), type: 'num' },
    { label: '+', onClick: () => handleInput('+'), type: 'operator' },
    
    { label: '0', onClick: () => handleInput('0'), type: 'num', wide: true },
    { label: '.', onClick: () => handleInput('.'), type: 'num' },
    { label: '=', onClick: calculate, type: 'equal' },
  ];

  const getBtnStyles = (type: string, wide?: boolean) => {
    const base = `calc-button h-16 rounded-2xl flex items-center justify-center text-xl font-medium shadow-lg transition-all ${wide ? 'col-span-1' : ''}`;
    switch(type) {
      case 'special': return `${base} bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white`;
      case 'operator': return `${base} bg-slate-800/50 text-indigo-400 hover:bg-indigo-500 hover:text-white`;
      case 'equal': return `${base} bg-indigo-600 text-white hover:bg-indigo-500`;
      default: return `${base} bg-slate-800/80 text-white hover:bg-slate-700`;
    }
  };

  return (
    <div className="glass p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm mx-auto select-none">
      <div className="mb-8 text-right overflow-hidden">
        <div className="text-slate-500 font-mono text-sm h-6 mb-1 truncate">
          {expression || '\u00A0'}
        </div>
        <div className="text-4xl font-bold font-mono tracking-tighter truncate">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={getBtnStyles(btn.type, btn.wide)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
