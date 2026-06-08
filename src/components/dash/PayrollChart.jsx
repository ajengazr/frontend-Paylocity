const PayrollChart = ({ title, subtitle, isDarkMode }) => {
    return (
        <div className={`p-6 rounded-xl border shadow-sm transition-all flex flex-col justify-between ${isDarkMode ? 'bg-[#1e293b] border-[#2d3748]' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border ${isDarkMode ? 'bg-[#151c27] border-[#2d3748]' : 'bg-gray-50 border-gray-200'}`}>
                    Jan - Jun 2024
                </span>
            </div>

            <div className="relative w-full h-56 mt-4">
                <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <line x1="0" y1="50" x2="500" y2="50" stroke={isDarkMode ? '#2d3748' : '#f3f4f6'} strokeWidth="1" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke={isDarkMode ? '#2d3748' : '#f3f4f6'} strokeWidth="1" />
                    <line x1="0" y1="150" x2="500" y2="150" stroke={isDarkMode ? '#2d3748' : '#f3f4f6'} strokeWidth="1" />
                    <path d="M 10,150 Q 100,140 180,95 T 350,55 T 490,25 L 490,200 L 10,200 Z" fill="url(#chartGradient)" />
                    <path d="M 10,150 Q 100,140 180,95 T 350,55 T 490,25" fill="none" stroke="#ff6b00" strokeWidth="3.5" strokeLinecap="round" />
                    <circle cx="490" cy="25" r="5" fill="#ff6b00" stroke={isDarkMode ? '#1e293b' : '#ffffff'} strokeWidth="2" />
                </svg>
                <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-2 px-1">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>Mei</span><span>Jun</span>
                </div>
            </div>
        </div>
    );
};

export default PayrollChart;