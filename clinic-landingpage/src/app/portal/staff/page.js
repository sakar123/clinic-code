import { staffApi } from '../../../lib/api';

export default async function StaffPage() {
  const staff = await staffApi.getAll();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Staff</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.person?.first_name} {s.person?.last_name}</td>
              <td className="p-2">{s.role?.name || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
