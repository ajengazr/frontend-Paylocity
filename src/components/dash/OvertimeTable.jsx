const OvertimeTable = ({ title, columns, data, searchQuery, isDarkMode, role }) => {

    const isAdmin = role === 'SUPER_ADMIN' || role === 'HR_ADMIN';

    const filtered = data.filter((item) => {
        const q = searchQuery.toLowerCase();
        if (isAdmin) return item.nama?.toLowerCase().includes(q);
        return item.tanggal?.toLowerCase().includes(q) || item.keterangan?.toLowerCase().includes(q);
    });

    return (
        <div className={`p-6 rounded-xl border shadow-sm transition-all flex flex-col justify-between ${isDarkMode ? 'bg-[#1e293b] border-[#2d3748]' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold">{title}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={`border-b text-[11px] font-semibold tracking-wider uppercase ${isDarkMode ? 'border-[#2d3748] text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                            {columns.map((col) => (
                                <th key={col} className="pb-3">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100/10 text-sm">
                        {filtered.length > 0 ? (
                            filtered.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-500/5 transition-colors">
                                    {role === 'SUPER_ADMIN' && (
                                        <td className="py-4 flex items-center gap-3">
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${row.color}`}>{row.initials}</span>
                                            <span className="font-semibold">{row.nama}</span>
                                        </td>
                                    )}
                                    <td className="py-4 text-gray-400 font-medium">{row.tanggal}</td>
                                    <td className="py-4 font-semibold">{row.jam}</td>
                                    <td className="py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${row.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                                            row.status === 'Disetujui' ? 'bg-emerald-500/10 text-emerald-500' :
                                                'bg-red-500/10 text-red-500'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    {role === 'employee' && <td className="py-4 text-gray-400">{row.keterangan}</td>}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 text-gray-400 text-xs">
                                    Tidak ada data ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OvertimeTable;