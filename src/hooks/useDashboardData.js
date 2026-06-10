import { useState, useEffect, useCallback } from 'react';
import api from '../config/api';

const useDashboardData = (role) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch data employee (yang sudah ada di BE)
            const employeesRes = await api.get('/api/employees').catch(() => ({ data: { data: [] } }));
            const employees = employeesRes.data?.data || employeesRes.data || [];

            // Hitung statistik dari data employee
            const totalKaryawan = employees.length;

            // Distribusi departemen (hitung dari data employee)
            const deptMap = {};
            employees.forEach(emp => {
                const dept = emp.department || emp.departemen || 'Lainnya';
                deptMap[dept] = (deptMap[dept] || 0) + 1;
            });

            const donutData = Object.entries(deptMap).map(([label, value], i) => ({
                label,
                value,
                color: ['#ff6b00', '#1a2332', '#9ca3af', '#93c5fd', '#10b981', '#f59e0b'][i % 6]
            }));

            // Transform data employee ke format tabel lembur (placeholder)
            const tableData = employees.slice(0, 5).map((emp, i) => ({
                id: emp.id || i + 1,
                nama: emp.name || emp.nama || emp.username,
                initials: (emp.name || emp.nama || emp.username || 'U').slice(0, 2).toUpperCase(),
                color: ['bg-orange-100 text-orange-700', 'bg-blue-100 text-blue-700', 'bg-teal-100 text-teal-700'][i % 3],
                tanggal: '14 Juni 2024', // placeholder sampai BE ada endpoint lembur
                jam: `${(i + 1) * 1.5} Jam`,
                status: ['Pending', 'Disetujui', 'Ditolak'][i % 3],
                keterangan: emp.position || emp.jabatan || '-'
            }));

            // Data dinamis yang akan override ROLE_CONFIG
            const dynamicData = {
                stats: {
                    totalKaryawan: totalKaryawan.toString(),
                    totalDepartemen: Object.keys(deptMap).length.toString(),
                },
                donutData,
                tableData,
                employees, // raw data untuk dipakai komponen lain
            };

            setData(dynamicData);

        } catch (err) {
            console.error('Dashboard data fetch error:', err);
            setError('Gagal memuat data dari server');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [role]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useDashboardData;