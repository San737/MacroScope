
import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface MacroDistributionChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

const MacroDistributionChart: React.FC<MacroDistributionChartProps> = ({
  protein,
  carbs,
  fat
}) => {
  const total = protein + carbs + fat;
  
  // Avoid division by zero
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-400">No data to display</p>
      </div>
    );
  }
  
  const data = [
    { name: 'Protein', value: protein, color: '#4ECDC4' },
    { name: 'Carbs', value: carbs, color: '#FFD166' },
    { name: 'Fat', value: fat, color: '#FF6B6B' }
  ];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(1)}g`, undefined]}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '6px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              border: 'none'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center mx-2">
            <div 
              className="w-3 h-3 rounded-full mr-1" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacroDistributionChart;
