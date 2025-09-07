import { serviceApi } from '../../../lib/api';

export default async function ServicesPage() {
  const services = await serviceApi.getAll();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Services</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{`$${s.price}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
