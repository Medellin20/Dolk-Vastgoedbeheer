import type { Metadata } from 'next';
import { ArrowLeft, Building2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { AdminLoginForm } from '@/components/admin/login-form';

export const metadata: Metadata = { title: 'Connexion administrateur' };

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-emerald p-12 lg:flex xl:p-20">
        <Link href="/" className="relative z-10 flex items-center gap-3 text-white"><Building2 className="h-8 w-8 text-champagne" strokeWidth={1.2} /><span className="font-display text-2xl">Dolk Real Estate Management BV</span></Link>
        <div className="architectural-mark opacity-40" aria-hidden="true"><span /><span /><span /></div>
        <div className="relative z-10"><p className="text-xs uppercase tracking-[0.25em] text-champagne">Uw private workspace</p><h1 className="mt-6 max-w-lg font-display text-5xl leading-tight text-white">Aandacht voor vastgoed.<br /><span className="italic text-sage">Ruimte voor mensen.</span></h1><p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-300">Beheer uw woningen, bezichtigingen en klantdossiers vanuit één overzichtelijke omgeving.</p></div>
        <p className="relative text-xs text-sage">Dolk Real Estate Management BV · Heerhugowaard, Nederland</p>
      </div>
      <div className="flex items-center justify-center bg-sand-100 px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-xs font-semibold text-emerald"><ArrowLeft className="h-4 w-4" /> Terug naar de website</Link>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-champagne/50 bg-champagne/15 text-emerald"><ShieldCheck className="h-6 w-6" strokeWidth={1.5} /></span>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald">Dolk Real Estate Management BV / Administratie</p>
          <h2 className="mt-3 font-display text-4xl text-ink-900">Welkom terug.</h2>
          <p className="mt-3 text-sm text-ink-500">Log in om uw vastgoed en aanvragen te beheren.</p>
          <div className="mt-8 rounded-2xl border border-emerald/10 bg-white p-6 shadow-soft"><AdminLoginForm /></div>
          <p className="mt-6 text-center text-xs text-ink-400">Beveiligde toegang voor beheerders</p>
        </div>
      </div>
    </div>
  );
}
