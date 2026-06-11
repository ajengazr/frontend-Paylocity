import { useState, useEffect } from 'react';
import employeeApi from '../../config/employeeApi';
import departmentApi from '../../config/departmentApi';
import positionApi from '../../config/positionApi';
import CrudTemplate from '../CrudTemplate';

const EmployeeCrud = ({ isDarkMode }) => {
    const [deptOptions, setDeptOptions] = useState([]);
    const [posOptions, setPosOptions] = useState([]);

    // Fetch departments & positions untuk dropdown
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [deptRes, posRes] = await Promise.all([
                    departmentApi.getAll(),
                    positionApi.getAll()
                ]);

                const depts = deptRes.data?.data || [];
                const positions = posRes.data?.data || [];

                // Dropdown: label = nama, value = id (string untuk select)
                setDeptOptions(depts.map(d => ({ value: String(d.id), label: d.name })));
                setPosOptions(positions.map(p => ({ value: String(p.id), label: p.name })));
            } catch (err) {
                console.error('Gagal fetch dropdown:', err);
            }
        };

        fetchOptions();
    }, []);

    return (
        <CrudTemplate
            api={employeeApi}
            title="Data Karyawan"
            subtitle="Kelola data seluruh karyawan perusahaan"
            isDarkMode={isDarkMode}
            searchKeys={['name', 'email', 'dept']}
            columns={[
                { key: 'name', label: 'Nama' },
                { key: 'email', label: 'Email' },
                {
                    key: 'dept',
                    label: 'Departemen',
                    render: (row) => (
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${row.dept === 'IT' ? 'bg-blue-100 text-blue-700' :
                                row.dept === 'HR' ? 'bg-purple-100 text-purple-700' :
                                    'bg-emerald-100 text-emerald-700'
                            }`}>
                            {row.dept}
                        </span>
                    )
                },
                { key: 'position', label: 'Jabatan' },
                {
                    key: 'status',
                    label: 'Status',
                    render: (row) => (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${row.status === 'Aktif' || row.status === 'ACTIVE' ? 'text-emerald-500' : 'text-amber-500'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Aktif' || row.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {row.status === 'ACTIVE' ? 'Aktif' : row.status === 'INACTIVE' ? 'Tidak Aktif' : row.status}
                        </span>
                    )
                },
            ]}
            formFields={[
                { name: 'username', label: 'Username', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'password', label: 'Password', type: 'password', required: true, showOnEdit: false },
                { name: 'nik', label: 'NIK', required: true },
                // DROPDOWN DINAMIS: label = nama departemen, value = id
                { name: 'departmentId', label: 'Departemen', type: 'select', required: true, options: deptOptions },
                { name: 'positionId', label: 'Jabatan', type: 'select', required: true, options: posOptions },
                { name: 'basicSalary', label: 'Gaji Pokok', type: 'number', required: true },
                {
                    name: 'taxStatus', label: 'Status Pajak', type: 'select', required: true, showOnEdit: false, options: [
                        { value: 'TK0', label: 'TK/0' }, { value: 'K0', label: 'K/0' },
                        { value: 'K1', label: 'K/1' }, { value: 'K2', label: 'K/2' }, { value: 'K3', label: 'K/3' },
                    ]
                },
                {
                    name: 'status', label: 'Status Karyawan', type: 'select', required: true, showOnEdit: false, options: [
                        { value: 'ACTIVE', label: 'Aktif' }, { value: 'INACTIVE', label: 'Tidak Aktif' },
                    ]
                },
                { name: 'joinDate', label: 'Tanggal Masuk', type: 'date', required: true, showOnEdit: false },
            ]}
            detailConfig={{
                fields: [
                    { key: 'nik', label: 'NIK' },
                    { key: 'department', label: 'Departemen' },
                    { key: 'position', label: 'Jabatan' },
                    { key: 'taxStatus', label: 'Status Pajak' },
                    { key: 'basicSalary', label: 'Gaji Pokok', type: 'currency' },
                    { key: 'status', label: 'Status Karyawan' },
                    { key: 'joinDate', label: 'Tanggal Masuk', type: 'date', fullWidth: true },
                ]
            }}
            // PENTING: transformRow harus include departmentId & positionId untuk edit
            transformRow={(emp) => ({
                id: emp.id,
                name: emp.user?.username || '-',
                email: emp.user?.email || '-',
                role: emp.user?.role || '-',
                nik: emp.nik,
                dept: emp.department?.name || '-',
                position: emp.position?.name || '-',
                // INI PENTING: ID untuk form edit
                departmentId: emp.department?.id,
                positionId: emp.position?.id,
                status: emp.status || 'Aktif',
                joinDate: emp.joinDate ? new Date(emp.joinDate).toLocaleDateString('id-ID') : '-',
                username: emp.user?.username,
                password: '',
                basicSalary: emp.basicSalary,
                taxStatus: emp.taxStatus,
            })}
            transformDetail={(emp) => ({
                name: emp.user?.username || emp.username,
                email: emp.user?.email || emp.email,
                role: emp.user?.role || emp.role,
                nik: emp.nik,
                department: emp.department?.name,
                position: emp.position?.name,
                basicSalary: emp.basicSalary,
                taxStatus: emp.taxStatus,
                status: emp.status,
                joinDate: emp.joinDate,
            })}
        />
    );
};

export default EmployeeCrud;