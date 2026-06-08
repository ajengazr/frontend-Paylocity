import { iconMap } from './iconMap';

const TopHeader = ({ isDarkMode, toggleDarkMode, searchQuery, setSearchQuery, userName, userRole, userAvatar }) => {
    return (
        <header className={`h-16 border-b px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md transition-colors duration-300 ${isDarkMode ? 'bg-[#151c27]/80 border-[#2d3748]' : 'bg-white/80 border-[#e5e7eb]'
            }`}>
            <div className="relative w-96">
                <iconMap.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari data atau laporan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 transition-all ${isDarkMode
                            ? 'bg-[#1e293b] border-[#334155] text-white focus:border-[#ff6b00]'
                            : 'bg-[#f9fafb] border-gray-200 text-[#111827] focus:border-[#ff6b00]'
                        }`}
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-md border transition-all ${isDarkMode
                            ? 'bg-[#1e293b] border-[#334155] text-yellow-400 hover:bg-[#2a3547]'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                    title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
                >
                    {isDarkMode ? <iconMap.Sun className="w-5 h-5" /> : <iconMap.Moon className="w-5 h-5" />}
                </button>

                <button className={`p-2 rounded-md border relative transition-all ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-gray-300' : 'bg-white border-gray-200 text-gray-600'
                    }`}>
                    <iconMap.Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 border-l pl-4 border-gray-300">
                    <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full object-cover border-2 border-[#ff6b00]" />
                    <div className="text-left hidden md:block">
                        <p className="text-sm font-semibold leading-tight">{userName}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userRole}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;