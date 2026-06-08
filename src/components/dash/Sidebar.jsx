import { iconMap } from './iconMap';

const Sidebar = ({ menu, activeTab, setActiveTab, isDarkMode }) => {
    return (
        <aside className={`w-64 fixed inset-y-0 left-0 z-20 flex flex-col justify-between border-r transition-colors duration-300 ${isDarkMode ? 'bg-[#1a2332] border-[#2d3748]' : 'bg-white border-[#e5e7eb]'
            }`}>
            <div>
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight text-[#ff6b00]">Paylocity</h1>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>HRIS Payroll</p>
                </div>

                <nav className="px-4 space-y-1">
                    {menu.map((item) => {
                        const Icon = iconMap[item.icon];
                        const isActive = activeTab === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${isActive
                                        ? 'bg-[#ff6b00]/10 text-[#ff6b00]'
                                        : isDarkMode
                                            ? 'text-gray-300 hover:bg-[#2a3547]'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className={`p-4 border-t transition-colors duration-300 ${isDarkMode ? 'border-[#2d3748]' : 'border-gray-200'}`}>
                <button className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${isDarkMode ? 'text-gray-300 hover:bg-[#2a3547]' : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                    <iconMap.Settings className="w-5 h-5" />
                    Pengaturan
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-500/10 transition-all mt-1">
                    <iconMap.LogOut className="w-5 h-5" />
                    Keluar
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;