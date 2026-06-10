import { Briefcase } from 'lucide-react';
import CrudTemplate from './CrudTemplate';
import positionApi from '../config/positionApi';

const PositionCrud = ({ isDarkMode }) => {
    return (
        <CrudTemplate
            api={positionApi}
            title="Data Jabatan"
            subtitle="Kelola jabatan/posisi perusahaan"
            icon={Briefcase}
            isDarkMode={isDarkMode}
            searchKeys={['name']}
            columns={[
                { key: 'name', label: 'Nama Jabatan' },
                { key: 'department', label: 'Departemen' },
                { key: 'employeeCount', label: 'Jumlah Karyawan' },
            ]}
            formFields={[
                { name: 'name', label: 'Nama Jabatan', required: true },
                { name: 'departmentId', label: 'Departemen', type: 'select', required: true, options: [] }, // isi dari API dept
            ]}
            detailConfig={{
                showAvatar: false,
                fields: [
                    { key: 'name', label: 'Nama Jabatan' },
                    { key: 'department', label: 'Departemen' },
                    { key: 'employeeCount', label: 'Total Karyawan' },
                ]
            }}
            transformRow={(pos) => ({
                id: pos.id,
                name: pos.name,
                department: pos.department?.name || '-',
                employeeCount: pos._count?.employees || 0,
            })}
            transformDetail={(pos) => ({
                name: pos.name,
                department: pos.department?.name,
                employeeCount: pos._count?.employees || 0,
            })}
        />
    );
};

export default PositionCrud;