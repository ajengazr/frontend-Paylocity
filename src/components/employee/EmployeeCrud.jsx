import { Users } from 'lucide-react';
import employeeApi from '../../config/employeeApi';
import CrudTemplate from '../CrudTemplate';

const EmployeeCrud = ({ isDarkMode }) => {
    return (
        <CrudTemplate
            api={employeeApi}
            title="Data Karyawan"
            subtitle="Kelola data seluruh karyawan perusahaan"
            icon={Users}
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
                {
                    name: 'department', label: 'Departemen', type: 'select', required: true, options: [
                        { value: 'IT', label: 'IT' },
                        { value: 'HR', label: 'HR' },
                        { value: 'Finance', label: 'Finance' },
                        { value: 'Marketing', label: 'Marketing' },
                    ]
                },
                { name: 'position', label: 'Jabatan', required: true },
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
            transformRow={(emp) => ({
                id: emp.id,
                name: emp.user?.username || '-',
                email: emp.user?.email || '-',
                role: emp.user?.role || '-',
                nik: emp.nik,
                dept: emp.department || '-',
                position: emp.position || '-',
                salary: emp.basicSalary,
                status: emp.status || 'Aktif',
                joinDate: emp.joinDate ? new Date(emp.joinDate).toLocaleDateString('id-ID') : '-',
                username: emp.user?.username,
                password: '',
                department: emp.department,
                basicSalary: emp.basicSalary,
                taxStatus: emp.taxStatus,
            })}
            transformDetail={(emp) => ({
                name: emp.user?.username || emp.username,
                email: emp.user?.email || emp.email,
                role: emp.user?.role || emp.role,
                nik: emp.nik,
                department: emp.department,
                position: emp.position,
                basicSalary: emp.basicSalary,
                taxStatus: emp.taxStatus,
                status: emp.status,
                joinDate: emp.joinDate,
            })}
        />
    );
};

export default EmployeeCrud;