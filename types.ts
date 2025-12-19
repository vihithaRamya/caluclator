
export interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface AIInsight {
  explanation: string;
  steps: string[];
  tips: string[];
}
