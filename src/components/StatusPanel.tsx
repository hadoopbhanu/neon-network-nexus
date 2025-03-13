
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Activity, Globe, Signal, Server, CircuitBoard } from 'lucide-react';

const StatusPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto-change tabs for demo
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Mock data for different status tabs
  const statusData = [
    {
      title: 'Global Network',
      icon: <Globe className="w-5 h-5" />,
      status: 'Optimal',
      stats: [
        { name: 'Uptime', value: '99.998%', change: '+0.001%' },
        { name: 'Traffic', value: '8.32 Tbps', change: '+1.2%' },
        { name: 'Latency', value: '4.1 ms', change: '-0.3 ms' },
        { name: 'Routes', value: '1,482', change: '+3' },
      ],
      chart: generateRandomPoints(24),
    },
    {
      title: 'Backbone Peering',
      icon: <Signal className="w-5 h-5" />,
      status: 'Optimal',
      stats: [
        { name: 'Connections', value: '412', change: '+2' },
        { name: 'Bandwidth', value: '12.7 Tbps', change: '+0.5%' },
        { name: 'Availability', value: '99.999%', change: '0%' },
        { name: 'Exchange Points', value: '18', change: '0' },
      ],
      chart: generateRandomPoints(24),
    },
    {
      title: 'Data Centers',
      icon: <Server className="w-5 h-5" />,
      status: 'Minor Issues',
      stats: [
        { name: 'Active', value: '42/43', change: '-1' },
        { name: 'Power Usage', value: '82.4%', change: '-3.1%' },
        { name: 'Temperature', value: '22.4°C', change: '+0.2°C' },
        { name: 'Cooling', value: '94.1%', change: '-0.8%' },
      ],
      chart: generateRandomPoints(24),
    },
    {
      title: 'Infrastructure',
      icon: <CircuitBoard className="w-5 h-5" />,
      status: 'Optimal',
      stats: [
        { name: 'Equipment', value: '8,743', change: '+21' },
        { name: 'Maintenance', value: '3/month', change: '0' },
        { name: 'Incidents', value: '2', change: '-1' },
        { name: 'Expansions', value: '4', change: '+1' },
      ],
      chart: generateRandomPoints(24),
    },
  ];
  
  // Get current active data
  const activeData = statusData[activeTab];
  
  return (
    <div className={cn(
      "glass-panel rounded-2xl overflow-hidden max-w-3xl transition-all duration-700 transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      {/* Tab navigation */}
      <div className="flex items-center border-b border-white/10">
        {statusData.map((item, index) => (
          <button
            key={item.title}
            className={cn(
              "flex items-center space-x-2 py-4 px-5 transition-all duration-300 relative",
              activeTab === index 
                ? "text-white" 
                : "text-gray-400 hover:text-gray-200"
            )}
            onClick={() => setActiveTab(index)}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
            
            {/* Active indicator */}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-esnet-blue" />
            )}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-sm text-gray-400">System Status</div>
            <div className="text-2xl font-medium mt-1">{activeData.title}</div>
          </div>
          
          <div className="flex items-center">
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm",
              activeData.status === 'Optimal' 
                ? "bg-green-500/20 text-green-400" 
                : "bg-yellow-500/20 text-yellow-400"
            )}>
              <span className={cn(
                "w-2 h-2 rounded-full mr-2",
                activeData.status === 'Optimal' ? "bg-green-400" : "bg-yellow-400"
              )} />
              {activeData.status}
            </span>
          </div>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {activeData.stats.map((stat) => (
            <div key={stat.name} className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-gray-400 mb-1">{stat.name}</div>
              <div className="text-xl font-semibold">{stat.value}</div>
              <div className={cn(
                "text-xs mt-1",
                stat.change.startsWith('+') ? "text-green-400" : 
                stat.change.startsWith('-') ? "text-red-400" : "text-gray-400"
              )}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
        
        {/* Chart */}
        <div className="h-36 relative">
          <div className="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 24 10" preserveAspectRatio="none">
              {/* Area */}
              <path
                d={`M0,10 ${activeData.chart.map((p, i) => `L${i},${10-p}`).join(' ')} L24,10 Z`}
                fill="url(#networkGradient)"
                opacity="0.3"
              />
              
              {/* Line */}
              <path
                d={`M0,${10-activeData.chart[0]} ${activeData.chart.map((p, i) => `L${i},${10-p}`).join(' ')}`}
                stroke={activeTab === 0 ? '#00A3FF' : activeTab === 1 ? '#9D6EFF' : activeTab === 2 ? '#FFB336' : '#36FFB5'}
                strokeWidth="0.2"
                fill="none"
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="networkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={activeTab === 0 ? '#00A3FF' : activeTab === 1 ? '#9D6EFF' : activeTab === 2 ? '#FFB336' : '#36FFB5'} />
                  <stop offset="100%" stopColor={activeTab === 0 ? '#00A3FF00' : activeTab === 1 ? '#9D6EFF00' : activeTab === 2 ? '#FFB33600' : '#36FFB500'} />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Current status marker */}
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-esnet-blue shadow-neon-blue transform -translate-x-2 translate-y-2" />
          </div>
        </div>
        
        {/* Time indicators */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>24 hours ago</span>
          <span>16 hours ago</span>
          <span>8 hours ago</span>
          <span>Now</span>
        </div>
        
        {/* Activity indicator */}
        <div className="flex items-center justify-center mt-6 text-xs text-gray-400">
          <Activity className="w-3 h-3 mr-2 text-esnet-blue animate-pulse" />
          Live monitoring active
        </div>
      </div>
    </div>
  );
};

// Helper function to generate random chart points
function generateRandomPoints(count: number): number[] {
  const points = [];
  
  for (let i = 0; i < count; i++) {
    // Create a somewhat smooth curve with some random variation
    const base = Math.sin(i / (count / Math.PI) * 2) * 3 + 5;
    points.push(Math.max(1, Math.min(9, base + (Math.random() - 0.5) * 2)));
  }
  
  return points;
}

export default StatusPanel;
