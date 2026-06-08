const EmployeeDistribution = ({ title, data, isDarkMode }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    let cumulative = 0;

    return (
        <div className={`p-6 rounded-xl border shadow-sm transition-all flex flex-col justify-between ${isDarkMode ? 'bg-[#1e293b] border-[#2d3748]' : 'bg-white border-gray-100'}`}>
            <h3 className="text-base font-semibold mb-4">{title}</h3>

            <div className="relative flex justify-center items-center my-6">
                <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r={radius} fill="transparent" stroke={isDarkMode ? '#2d3748' : '#f1f5f9'} strokeWidth="16" />
                    {data.map((item, i) => {
                        const segment = (item.value / total) * circumference;
                        const offset = circumference - segment;
                        const rotation = (cumulative / total) * 360;
                        // eslint-disable-next-line react-hooks/immutability
                        cumulative += item.value;
                        return (
                            <circle
                                key={i}
                                cx="80"
                                cy="80"
                                r={radius}
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth="16"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '80px 80px' }}
                            />
                        );
                    })}
                </svg>
                <div className="absolute text-center">
                    <span className="block text-3xl font-extrabold tracking-tight">{total}</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
                {data.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded shrink-0" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-400 font-medium truncate">{item.label} ({item.value})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeDistribution;