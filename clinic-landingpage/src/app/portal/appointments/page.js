import { appointmentApi } from '../../../lib/api';

export default async function AppointmentsPage() {
  const appointments = await appointmentApi.getAll();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Start</th>
            <th className="text-left p-2">Duration</th>
            <th className="text-left p-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">
                {new Date(a.appointment_start_time).toLocaleString()}
              </td>
              <td className="p-2">{a.duration_minutes} min</td>
              <td className="p-2">{a.reason_for_visit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
