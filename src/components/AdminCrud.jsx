import adminApi from "../config/adminApi";
import RegisterForm from "./auth/RegisterForm";
import CrudTemplate from "./CrudTemplate";

const AdminCrud = ({ isDarkMode }) => {
    return (
        <CrudTemplate
            api={adminApi}
            title="Data Admin"
            subtitle="Kelola akun admin perusahaan"
            isDarkMode={isDarkMode}
            searchKeys={['name', 'email', 'role']}
            columns={[
                { key: 'name', label: 'Nama' },
                { key: 'email', label: 'Email' },
                {
                    key: 'role',
                    label: 'Role',
                    render: (row) => (
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${row.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                            {row.role === 'SUPER_ADMIN' ? 'Super Admin' : 'HR Admin'}
                        </span>
                    )
                },
                { key: 'createdAt', label: 'Dibuat' },
            ]}
            formFields={[
                { name: 'username', label: 'Username', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                // Password: muncul saat create (RegisterForm), TAPI TIDAK muncul saat edit
                { name: 'password', label: 'Password', type: 'password', required: true, showOnEdit: false },
            ]}
            detailConfig={{
                showAvatar: false,
                fields: [
                    { key: 'name', label: 'Nama' },
                    { key: 'email', label: 'Email' },
                    { key: 'role', label: 'Role' },
                    { key: 'createdAt', label: 'Dibuat', type: 'date' },
                    { key: 'updatedAt', label: 'Diperbarui', type: 'date' },
                ]
            }}
            transformRow={(admin) => ({
                id: admin.id,
                name: admin.username || '-',
                email: admin.email || '-',
                role: admin.role || '-',
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            })}
            transformDetail={(admin) => ({
                name: admin.username || '-',
                email: admin.email || '-',
                role: admin.role || '-',
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            })}
            renderCreateForm={({ onClose, onSuccess }) => (
                <RegisterForm
                    isModal={true}
                    onClose={onClose}
                    onSuccess={onSuccess}
                />
            )}
        />
    );
};

export default AdminCrud;