import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  Clock,
  Home,
  FileText,
  PlusCircle,
  CalendarDays,
  ArrowUpRight,
} from 'lucide-react';
import { getDashboardStats, getRecentAdminLogs } from '@/lib/data/admin-stats';
import { StatCard } from '@/components/admin/stat-card';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/utils/format';
import type { DashboardStats } from '@/types';

export const metadata: Metadata = { title: 'Dashboard admin' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [statsResult, logsResult] = await Promise.allSettled([
    getDashboardStats(),
    getRecentAdminLogs(),
  ]);

  const stats: DashboardStats = statsResult.status === 'fulfilled'
    ? statsResult.value
    : {
        totalProperties: 0,
        availableProperties: 0,
        reservedProperties: 0,
        rentedProperties: 0,
        draftProperties: 0,
        viewingRequestsTotal: 0,
        viewingsToday: 0,
        reservationsPending: 0,
  };
  const logs = logsResult.status === 'fulfilled' ? logsResult.value : [];
  const dataLoadFailed = [statsResult, logsResult].some((result) => result.status === 'rejected');

  return (
    <div>
      {dataLoadFailed && (
        <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Sommige gegevens kunnen niet worden geladen. Controleer de Supabase-variabelen van de implementatie.
        </div>
      )}
      <div className="dashboard-intro mb-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-emerald/10 bg-emerald p-6 sm:p-8">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne">Dolk Vastgoedbeheer BV / Beheer & overzicht</p>
          <h1 className="font-display text-3xl font-normal text-white sm:text-4xl">Uw vastgoed, in één overzicht.</h1>
          <p className="mt-3 text-sm text-sand-300">Overzicht van de activiteiten van het agentschap.</p>
        </div>
        <Link href="/admin/appartements/nouveau" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <PlusCircle className="h-4 w-4" />
            Woning toevoegen
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard href="/admin/appartements" icon={Building2} label="Total appartementen" value={stats.totalProperties} />
        <StatCard href="/admin/appartements?status=available" icon={Home} label="beschikbare" value={stats.availableProperties} tone="positive" />
        <StatCard href="/admin/appartements?status=reserved" icon={Clock} label="Gereserveerd" value={stats.reservedProperties} tone="warning" />
        <StatCard href="/admin/appartements?status=rented" icon={CheckCircle2} label="Verhuurd" value={stats.rentedProperties} />
        <StatCard href="/admin/appartements?status=draft" icon={FileText} label="Concepten" value={stats.draftProperties} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { href: '/admin/visites', label: 'Bezichtigingsaanvragen', value: stats.viewingRequestsTotal, icon: CalendarDays },
          { href: '/admin/visites?date=today', label: 'Bezichtigingen vandaag', value: stats.viewingsToday, icon: Clock },
          { href: '/admin/reservations?scope=pending', label: 'Reserveringen in afwachting', value: stats.reservationsPending, icon: FileText },
        ].map(item => <Link key={item.href} href={item.href} className="flex items-center gap-4 rounded-2xl border border-emerald/10 bg-white p-5 transition hover:border-champagne hover:shadow-card"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-emerald"><item.icon className="h-5 w-5" /></span><span className="flex-1"><span className="block text-2xl font-semibold text-emerald">{item.value}</span><span className="text-xs text-ink-500">{item.label}</span></span><ArrowUpRight className="h-4 w-4 text-ink-300" /></Link>)}
      </div>

      <div className="mt-8 rounded-2xl border border-emerald/10 bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-lg font-semibold text-emerald">Recente activiteit</h2>
        {logs.length === 0 ? (
          <p className="mt-3 text-sm text-ink-400">Momenteel zijn er geen geregistreerde activiteiten.</p>
        ) : (
          <ul className="mt-4 divide-y divide-ink-100">
            {logs.map((log) => (
              <li key={log.id} className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="min-w-0 text-ink-700">{log.action}</span>
                <span className="shrink-0 text-xs text-ink-400">{formatDateTime(log.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
