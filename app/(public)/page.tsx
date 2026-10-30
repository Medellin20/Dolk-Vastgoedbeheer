import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ShieldCheck, KeyRound, CalendarCheck, Building2, Quote, Star, MapPin } from 'lucide-react';
import { HeroSearchBar } from '@/components/properties/hero-search-bar';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { FeaturedProperties } from '@/components/properties/featured-properties';
import { getCityPropertySummaries, getFeaturedProperties } from '@/lib/data/properties';
import { formatPrice } from '@/lib/utils/format';
import { DUTCH_CITIES } from '@/lib/utils/constants';
import { DUTCH_TESTIMONIALS } from '@/lib/data/testimonials';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Dolk Vastgoedbeheer — Appartementen huren in Nederland',
  description:
    'Vind uw volgende woning in Nederland. Dolk Vastgoedbeheer maakt het zoeken, bezichtigen en reserveren van appartementen in Amsterdam, Rotterdam, Utrecht en daarbuiten eenvoudig.',
};

const STEPS = [
  {
    icon: Building2,
    title: 'Zoek een woning',
    description: 'Filter op stad, budget en aantal slaapkamers uit onze geverifieerde advertenties.',
  },
  {
    icon: CalendarCheck,
    title: 'Plan een bezichtiging',
    description: 'Kies een datum en tijdstip en verstuur uw aanvraag gratis naar het agentschap.',
  },
  {
    icon: ShieldCheck,
    title: 'Verstuur uw reservering',
    description: 'Deel uw huurplannen; ons team beoordeelt daarna uw dossier.',
  },
  {
    icon: KeyRound,
    title: 'Verhuis',
    description: 'Na goedkeuring van uw dossier ontvangt u de sleutels van uw nieuwe woning.',
  },
];

const TRUST_POINTS = [
  { value: '6', label: 'steden in Nederland' },
  { value: '100%', label: 'geverifieerde advertenties van het agentschap' },
  { value: '48h', label: 'gemiddelde reactietermijn op een aanvraag' },
];

export default async function HomePage() {
  const [citySummaries, featuredProperties] = await Promise.all([
    getCityPropertySummaries(),
    getFeaturedProperties(3),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="luxury-hero relative overflow-hidden border-b border-emerald/10">
        <div className="container-app relative pb-10 pt-12 sm:pb-14 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <FadeIn>
              <span className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald"><span className="h-px w-8 bg-champagne" /> Wonen met vertrouwen</span>
              <h1 className="mt-6 max-w-2xl font-display text-[2.8rem] leading-[1.07] tracking-tight text-emerald sm:text-6xl lg:text-[4.25rem]">
                Een bijzonder huis.<br /><span className="italic text-ink-500">Een nieuw begin.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-500">
                Vind uw volgende woning in Nederland. Dolk Vastgoedbeheer begeleidt u persoonlijk, van de eerste bezichtiging tot de sleuteloverdracht.
              </p>
              <Link href="/appartements" className="mt-7 inline-flex items-center gap-4 border-b border-emerald/30 pb-2 text-sm font-semibold text-emerald transition hover:border-champagne">Ontdek onze woningen <ArrowRight className="h-4 w-4" /></Link>
            </FadeIn>
            <FadeIn delay={0.1} className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-t-[6rem] rounded-b-2xl bg-emerald sm:aspect-[6/5]">
                {featuredProperties[0]?.property_images[0] ? (
                  <Image src={(featuredProperties[0].property_images.find(image => image.is_primary) ?? featuredProperties[0].property_images[0]).url} alt={featuredProperties[0].title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                ) : (
                  <div className="architectural-mark" aria-hidden="true"><span /><span /><span /><Building2 className="relative h-20 w-20 text-champagne" strokeWidth={0.7} /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4 text-white">
                  <div><p className="text-[10px] uppercase tracking-[0.2em] text-champagne">Dolk Vastgoedbeheer</p><p className="mt-2 font-display text-2xl">{featuredProperties[0]?.city ?? 'Thuis in Nederland'}</p></div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30"><ArrowRight className="h-5 w-5" /></span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-4 rounded-xl border border-emerald/10 bg-sand-100 px-5 py-3 shadow-card sm:left-8"><span className="flex items-center gap-2 text-xs font-semibold text-emerald"><ShieldCheck className="h-4 w-4" /> Persoonlijke begeleiding</span></div>
            </FadeIn>
          </div>
          <FadeIn delay={0.15} className="relative z-10 mt-12"><HeroSearchBar /></FadeIn>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-500"><span className="font-semibold text-emerald">Populaire steden</span>{DUTCH_CITIES.map(city => <Link key={city} href={`/appartements?city=${encodeURIComponent(city)}`} className="transition hover:text-emerald hover:underline">{city}</Link>)}</div>
        </div>
      </section>

      {/* CHIFFRES DE CONFIANCE */}
      <section className="border-b border-emerald/10 bg-sage-100/50 py-8">
        <div className="container-app grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <div key={point.label} className="flex items-center gap-4">
              <span className="font-display text-4xl text-emerald">{point.value}</span>
              <span className="text-sm text-ink-500">{point.label}</span>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProperties properties={featuredProperties} />

      {/* APPARTEMENTS CLASSÉS PAR VILLE */}
      <section className="py-16 sm:py-20">
        <div className="container-app">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Nederland"
                title="Populaire steden"
                description="Kies een stad om alle beschikbare appartementen te bekijken."
              />
              <Link href="/appartements">
                <Button variant="outline">
                  Alle appartementen bekijken
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {citySummaries.map((summary, index) => (
              <FadeIn key={summary.city} delay={Math.min(index, 6) * 0.04}>
                <Link
                  href={`/appartements?city=${encodeURIComponent(summary.city)}`}
                  className="group flex items-center gap-4 rounded-2xl border border-emerald/10 bg-white p-4 shadow-soft transition hover:border-champagne sm:gap-5"
                >
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-sand-200 sm:h-28 sm:w-44">
                    {summary.imageUrl ? (
                      <Image src={summary.imageUrl} alt={`Appartement in ${summary.city}`} fill sizes="(max-width: 640px) 112px, 176px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <span className="flex h-full items-center justify-center text-canal-500"><MapPin className="h-7 w-7" /></span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-extrabold text-canal-700 sm:text-2xl">{summary.city}</h3>
                    <p className="mt-1 text-sm text-ink-600 sm:text-base">{summary.count} appartement{summary.count > 1 ? 's' : ''}</p>
                    <p className="mt-0.5 text-sm text-ink-500 sm:text-base">Gem. {formatPrice(summary.averagePrice)} / maand</p>
                  </div>
                  <ArrowRight className="h-7 w-7 shrink-0 text-canal-500 transition-transform group-hover:translate-x-1 sm:h-8 sm:w-8" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="container-app">
        <div className="canal-divider" />
      </div>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-16 sm:py-20">
        <div className="container-app">
          <FadeIn>
            <SectionHeading
              eyebrow="Processus"
              title="Hoe werkt het"
              description="Van zoeken tot verhuizen: een traject dat uw leven eenvoudiger maakt."
              align="center"
              className="mx-auto"
            />
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08} className="h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
                  <span className="text-eyebrow text-ink-300">Stap {i + 1}</span>
                  <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-canal-50 text-canal-700">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-500">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-10 text-center">
            <Link href="/comment-ca-marche">
              <Button variant="ghost">
                Meer over ons proces
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* TÉMOIGNAGES CLIENTS */}
      <section className="border-y border-ink-100 bg-sand-100/60 py-16 sm:py-20">
        <div className="container-app">
          <FadeIn>
            <SectionHeading
              eyebrow="Ervaringen"
              title="Wat onze klanten over RealEstate zeggen"
              description="Feedback van klanten die zijn begeleid bij hun zoektocht naar een woning in Nederland. Blader door 50 ervaringen."
            />
          </FadeIn>

          <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]">
            {DUTCH_TESTIMONIALS.map((testimonial, index) => (
              <article
                key={index}
                className="flex min-h-64 w-[85vw] max-w-sm shrink-0 snap-start flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-soft sm:w-80"
              >
                <div className="flex items-center justify-between gap-3">
                  <Quote className="h-7 w-7 text-canal-500" aria-hidden="true" />
                  <div className="flex gap-0.5 text-amber-400" aria-label="5 sterren op 5">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink-600" lang="nl">
                  “{testimonial}”
                </blockquote>
                <p className="mt-5 border-t border-ink-100 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Klant van Dolk Vastgoedbeheer · Ervaring {index + 1}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-20">
        <div className="container-app">
          <FadeIn>
            <div className="luxury-cta relative overflow-hidden rounded-3xl bg-emerald px-6 py-14 text-center sm:px-16">
              <h2 className="text-display-sm font-extrabold text-white sm:text-display-md">
                Klaar om uw nieuwe woning te vinden?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sand-200">
                Bekijk onze geverifieerde advertenties en plan in enkele minuten een bezichtiging.
              </p>
              <Link href="/appartements" className="mt-7 inline-block">
                <Button variant="secondary" size="lg">
                  Bekijk beschikbare appartementen
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
