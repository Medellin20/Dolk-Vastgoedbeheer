import { StatusAutoRefresh } from '@/components/shared/status-auto-refresh';
import { AdminTopbar } from '@/components/admin/topbar';
import { AdminSidebar } from '@/components/admin/sidebar';

// Toutes les pages administrateur lisent des données privées Supabase et
// doivent être rendues à la requête, jamais prégénérées pendant le build.
export const dynamic = 'force-dynamic';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell flex min-h-screen flex-col bg-sand-100 lg:flex-row">
      <StatusAutoRefresh />
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 xl:p-10">{children}</main>
      </div>
    </div>
  );
}
