import { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Pencil, Trash2, X, Loader2, Eye, AlertTriangle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const CrudTemplate = ({
    api,
    title,
    subtitle,
    // icon: IconHeader,
    columns,
    formFields,
    detailConfig,
    searchKeys,
    transformRow,
    transformDetail,
    isDarkMode,
}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { addToast } = useToast();

    const cardBg = isDarkMode ? 'bg-[#1e293b] border-[#2d3748]' : 'bg-white border-gray-100';
    const inputBg = isDarkMode ? 'bg-[#151c27] border-[#334155] text-white' : 'bg-[#f9fafb] border-gray-200 text-[#111827]';

    const buildInitialForm = () => {
        const initial = {};
        formFields.forEach(f => { initial[f.name] = ''; });
        return initial;
    };

    const [form, setForm] = useState(buildInitialForm);

    const fetchItems = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.getAll();
            const data = res.data?.data || [];
            setItems(data);
        } catch (err) {
            addToast(err.response?.data?.errors || 'Gagal memuat data', 'error');
        } finally {
            setLoading(false);
        }
    }, [api, addToast]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchItems();
    }, [fetchItems]);

    const fetchDetail = async (id) => {
        try {
            setDetailLoading(true);
            const res = await api.getById(id);
            const raw = res.data?.data || res.data;
            setSelectedItem(transformDetail ? transformDetail(raw) : raw);
            setIsDetailOpen(true);
        } catch (err) {
            addToast(err.response?.data?.errors || 'Gagal memuat detail', 'error');
        } finally {
            setDetailLoading(false);
        }
    };

    const isDateString = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v);

    const formatDate = (val) => {
        if (!val) return '-';
        return new Date(val).toLocaleDateString('id-ID'); // 10/06/2026
    };

    const filtered = items.map(transformRow).filter((row) =>
        searchKeys.some(key => {
            const val = row[key];
            return val && String(val).toLowerCase().includes(search.toLowerCase());
        })
    );

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const resetForm = () => {
        setForm(buildInitialForm());
        setEditingId(null);
    };

    const openCreate = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const openEdit = (row) => {
        setEditingId(row.id);
        const newForm = {};
        formFields.forEach(f => {
            newForm[f.name] = row[f.name] ?? row[f.key] ?? '';
        });
        setForm(newForm);
        setIsModalOpen(true);
    };

    const openDelete = (id) => {
        setDeleteTargetId(id);
        setIsDeleteOpen(true);
    };

    const closeDelete = () => {
        setIsDeleteOpen(false);
        setDeleteTargetId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = {};
            formFields.forEach(f => {
                if (form[f.name] !== undefined && form[f.name] !== '') {
                    payload[f.name] = f.type === 'number' ? Number(form[f.name]) : form[f.name];
                }
            });

            if (editingId) {
                await api.update(editingId, payload);
                addToast('Data berhasil diperbarui!', 'success');
            } else {
                await api.create(payload);
                addToast('Data berhasil ditambahkan!', 'success');
            }

            setIsModalOpen(false);
            resetForm();
            fetchItems();
        } catch (err) {
            addToast(err.response?.data?.errors || 'Terjadi kesalahan', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTargetId) return;
        try {
            setDeleteLoading(true);
            await api.delete(deleteTargetId);
            addToast('Data berhasil dihapus!', 'success');
            fetchItems();
            closeDelete();
        } catch (err) {
            addToast(err.response?.data?.errors || 'Gagal menghapus', 'error');
        } finally {
            setDeleteLoading(false);
        }
    };

    const formatRupiah = (val) => {
        if (!val) return '-';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
    };

    const getFormatValue = (val, type) => {
        if (type === 'currency') return formatRupiah(val);
        if (type === 'date') return formatDate(val);
        return val || '-';
    };

    const renderFormField = (field) => {
        const isShown = editingId
            ? (field.showOnEdit !== false)
            : (field.showOnCreate !== false);

        if (!isShown) return null;

        const baseClass = `w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 ${inputBg}`;

        return (
            <div key={field.name} className={field.gridCols === 2 ? 'col-span-2' : ''}>
                <label className="text-xs font-semibold mb-1 block">{field.label}</label>
                {field.type === 'select' ? (
                    <select name={field.name} value={form[field.name]} onChange={handleChange} required={field.required && !editingId}
                        className={baseClass}>
                        <option value="">Pilih</option>
                        {field.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        name={field.name}
                        type={field.type || 'text'}
                        value={form[field.name]}
                        onChange={handleChange}
                        required={field.required && !editingId}
                        className={baseClass}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight">{title}</h2>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
                </div>
                <button onClick={openCreate}
                    className="px-4 py-2.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95 text-sm">
                    <Plus className="w-4 h-4" />
                    Tambah {title.split(' ')[1] || 'Data'}
                </button>
            </div>

            {/* Search */}
            <div className={`p-4 lg:p-5 rounded-xl border shadow-sm ${cardBg}`}>
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Cari..." value={search} onChange={e => setSearch(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 transition-all ${inputBg}`} />
                </div>
            </div>

            {/* Table */}
            <div className={`rounded-xl border shadow-sm overflow-hidden ${cardBg}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`border-b text-[11px] font-semibold tracking-wider uppercase ${isDarkMode ? 'border-[#2d3748] text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                                {columns.map(col => (
                                    <th key={col.key} className="px-4 lg:px-6 py-3 lg:py-4">{col.label}</th>
                                ))}
                                <th className="px-4 lg:px-6 py-3 lg:py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/10 text-sm">
                            {loading ? (
                                <tr><td colSpan={columns.length + 1} className="text-center py-8">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#ff6b00]" />
                                </td></tr>
                            ) : filtered.length > 0 ? (
                                filtered.map(row => (
                                    <tr key={row.id} className="hover:bg-gray-500/5 transition-colors">
                                        {columns.map(col => (
                                            <td key={col.key} className="px-4 lg:px-6 py-3 lg:py-4">
                                                {col.render ? col.render(row, isDarkMode) : (
                                                    isDateString(row[col.key]) ? formatDate(row[col.key]) : row[col.key]
                                                )}
                                            </td>
                                        ))}
                                        <td className="px-4 lg:px-6 py-3 lg:py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => fetchDetail(row.id)}
                                                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-[#ff6b00]" title="Detail">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => openEdit(row)}
                                                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-blue-500" title="Edit">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => openDelete(row.id)}
                                                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-red-500" title="Hapus">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={columns.length + 1} className="text-center py-8 text-gray-400 text-xs">Tidak ada data</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Create/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border shadow-xl p-6 ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-[#151c27]'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">{editingId ? 'Edit' : 'Tambah'} {title.split(' ')[1] || 'Data'}</h3>
                            <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-1 rounded-md hover:bg-black/5 transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {formFields.map(renderFormField)}
                            <div className="col-span-2 flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${isDarkMode ? 'border-[#334155] text-gray-300 hover:bg-[#2a3547]' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                                    Batal
                                </button>
                                <button type="submit" disabled={submitting}
                                    className="px-4 py-2.5 bg-[#ff6b00] hover:bg-[#e05e00] text-white font-semibold rounded-lg text-sm transition-all disabled:opacity-60 flex items-center gap-2">
                                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingId ? 'Simpan' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Delete */}
            {isDeleteOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className={`w-full max-w-sm rounded-2xl border shadow-xl p-6 ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-[#151c27]'}`}>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center"><AlertTriangle className="w-7 h-7 text-red-500" /></div>
                            <div><h3 className="text-lg font-bold mb-1">Hapus Data?</h3><p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tindakan ini tidak dapat dibatalkan.</p></div>
                            <div className="flex w-full gap-3 pt-2">
                                <button onClick={closeDelete} disabled={deleteLoading} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${isDarkMode ? 'border-[#334155] text-gray-300 hover:bg-[#2a3547]' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>Batal</button>
                                <button onClick={handleDeleteConfirm} disabled={deleteLoading} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                    {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}{deleteLoading ? 'Menghapus...' : 'Ya, Hapus'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Detail */}
            {isDetailOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border shadow-xl p-6 ${isDarkMode ? 'bg-[#1e293b] border-[#334155] text-white' : 'bg-white border-gray-100 text-[#151c27]'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Detail {title.split(' ')[1] || 'Data'}</h3>
                            <button onClick={() => { setIsDetailOpen(false); setSelectedItem(null); }} className="p-1 rounded-md hover:bg-black/5 transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        {detailLoading ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-3"><Loader2 className="w-8 h-8 animate-spin text-[#ff6b00]" /><p className="text-sm text-gray-400">Memuat...</p></div>
                        ) : selectedItem ? (
                            <div className="space-y-5">
                                {detailConfig?.showAvatar !== false && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-[#ff6b00]/10 flex items-center justify-center text-[#ff6b00] font-bold text-xl">
                                            {(selectedItem.name || selectedItem.username || '?')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{selectedItem.name || selectedItem.username || '-'}</h4>
                                            {selectedItem.email && <p className="text-sm text-gray-400">{selectedItem.email}</p>}
                                            {selectedItem.role && <span className="inline-flex mt-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">{selectedItem.role}</span>}
                                        </div>
                                    </div>
                                )}
                                <div className={`border-t ${isDarkMode ? 'border-[#334155]' : 'border-gray-200'}`} />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {detailConfig?.fields?.map(field => (
                                        <div key={field.key} className={field.fullWidth ? 'col-span-2' : ''}>
                                            <p className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{field.label}</p>
                                            <p className="font-semibold">{getFormatValue(selectedItem[field.key], field.type)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button onClick={() => { setIsDetailOpen(false); setSelectedItem(null); }}
                                        className={`px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${isDarkMode ? 'border-[#334155] text-gray-300 hover:bg-[#2a3547]' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">Data tidak ditemukan</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrudTemplate;