import { patientApi } from '../../../lib/api';

export default async function PatientsPage() {
  const patients = await patientApi.getAll();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Patients</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Phone</th>
            <th className="text-left p-2">Emergency Contact</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">
                {p.person?.first_name} {p.person?.last_name}
              </td>
              <td className="p-2">{p.person?.phone_number || '—'}</td>
              <td className="p-2">
                {p.emergency_contact_name} {p.emergency_contact_phone && `(${p.emergency_contact_phone})`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
