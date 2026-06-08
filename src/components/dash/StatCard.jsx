import { iconMap } from './iconMap';

const colorMap = {
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    amber: 'bg-amber-500/10 text-amber-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
};

const StatCard = ({ label, value, suffix, trend, icon, color, isDarkMode }) => {
    const Icon = iconMap[icon];
    return (
        <div className={`p-6 rounded-xl border shadow-sm transition-all ${isDarkMode ? 'bg-[#1e293b] border-[#2d3748]' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className={`text-xs font-semibold tracking-wider uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                    <p className="text-3xl font-bold mt-2">{value}{suffix}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.blue}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className={`flex items-center gap-1.5 mt-4 text-xs font-semibold ${color === 'emerald' ? 'text-emerald-500' : color === 'amber' ? 'text-amber-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                {trend}
            </div>
        </div>
    );
};

export default StatCard;