import { iconMap } from './iconMap';

const TopHeader = ({ isDarkMode, toggleDarkMode, searchQuery, setSearchQuery, userName, userRole, userAvatar }) => {
    return (
        <header className={`h-14 lg:h-16 border-b px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md transition-colors duration-300 ${isDarkMode ? 'bg-[#151c27]/80 border-[#2d3748]' : 'bg-white/80 border-[#e5e7eb]'
            }`}>
            {/* Spacer for mobile hamburger */}
            <div className="lg:hidden w-8" />

            <div className="relative flex-1 max-w-50 sm:max-w-xs lg:max-w-md">
                <iconMap.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari data..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-3 py-1.5 lg:py-2 text-xs lg:text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 transition-all ${isDarkMode
                            ? 'bg-[#1e293b] border-[#334155] text-white focus:border-[#ff6b00]'
                            : 'bg-[#f9fafb] border-gray-200 text-[#111827] focus:border-[#ff6b00]'
                        }`}
                />
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
                <button
                    onClick={toggleDarkMode}
                    className={`p-1.5 lg:p-2 rounded-md border transition-all ${isDarkMode
                            ? 'bg-[#1e293b] border-[#334155] text-yellow-400 hover:bg-[#2a3547]'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    {isDarkMode ? <iconMap.Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : <iconMap.Moon className="w-4 h-4 lg:w-5 lg:h-5" />}
                </button>

                <button className={`p-1.5 lg:p-2 rounded-md border relative transition-all ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-gray-300' : 'bg-white border-gray-200 text-gray-600'
                    }`}>
                    <iconMap.Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-2 lg:gap-3 border-l pl-2 lg:pl-4 border-gray-300">
                    <img src={userAvatar} alt={userName} className="w-7 h-7 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-[#ff6b00]" />
                    <div className="text-left hidden sm:block">
                        <p className="text-xs lg:text-sm font-semibold leading-tight">{userName}</p>
                        <p className={`text-[10px] lg:text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userRole}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;