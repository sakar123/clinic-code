import Link from 'next/link';

export const metadata = {
  title: 'Clinic Portal',
};

export default function PortalLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-600 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Clinic Portal</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/portal" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/portal/patients" className="hover:underline">
            Patients
          </Link>
          <Link href="/portal/appointments" className="hover:underline">
            Appointments
          </Link>
          <Link href="/portal/staff" className="hover:underline">
            Staff
          </Link>
          <Link href="/portal/services" className="hover:underline">
            Services
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
