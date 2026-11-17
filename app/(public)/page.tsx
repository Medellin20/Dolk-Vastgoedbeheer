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
  title: 'Vastgoed Beheer B.V. — Appartementen huren in Nederland',
  description:
    'Vind uw volgende woning in Nederland. Vastgoed Beheer B.V. maakt het zoeken, bezichtigen en reserveren van appartementen in Amsterdam, Rotterdam, Utrecht en daarbuiten eenvoudig.',
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
      <section className="relative isolate bg-sage-50 pb-10 sm:pb-14">
        <div className="relative min-h-[30rem] overflow-hidden bg-emerald-950 pb-28 pt-14 sm:min-h-[35rem] sm:pb-36 sm:pt-24">
          {featuredProperties[0]?.property_images[0] ? (
            <Image src={(featuredProperties[0].property_images.find(image => image.is_primary) ?? featuredProperties[0].property_images[0]).url} alt={featuredProperties[0].title} fill priority sizes="100vw" className="object-cover object-center" />
          ) : (
            <div className="architectural-mark" aria-hidden="true"><span /><span /><span /></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/75 to-emerald-950/30" />
          <div className="container-app relative">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm"><MapPin className="h-3.5 w-3.5" /> Rotterdam · Thuis in Nederland</span>
              <h1 className="mt-6 max-w-3xl font-display text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Hier begint<br />uw volgende hoofdstuk.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Vind een woning die bij u past. Vastgoed Beheer B.V. begeleidt u persoonlijk, van de eerste bezichtiging tot de sleuteloverdracht.
              </p>
              <Link href="/appartements" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-champagne-200">Ontdek onze woningen <ArrowRight className="h-4 w-4" /></Link>
              <p className="mt-6 flex items-center gap-2 text-xs text-white/85"><ShieldCheck className="h-4 w-4 text-champagne" /> Persoonlijke begeleiding, van zoeken tot verhuizen</p>
            </FadeIn>
          </div>
        </div>
        <div className="container-app relative z-10 -mt-16 sm:-mt-20">
          <FadeIn delay={0.1}><HeroSearchBar /></FadeIn>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-500"><span className="font-semibold text-emerald">Populaire steden</span>{DUTCH_CITIES.map(city => <Link key={city} href={`/appartements?city=${encodeURIComponent(city)}`} className="transition hover:text-emerald hover:underline">{city}</Link>)}</div>
        </div>
      </section>

      {/* CHIFFRES DE CONFIANCE */}
      <section className="border-b border-emerald/10 bg-white py-8">
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

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {citySummaries.map((summary, index) => (
              <FadeIn key={summary.city} delay={Math.min(index, 6) * 0.04} className="min-w-0">
                <Link href={`/appartements?city=${encodeURIComponent(summary.city)}`} className="group relative flex min-h-72 min-w-0 items-end overflow-hidden rounded-3xl bg-emerald-950 p-6 sm:min-h-80">
                  {summary.imageUrl ? (
                    <Image src={summary.imageUrl} alt={`Appartement in ${summary.city}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : <MapPin className="absolute right-8 top-8 h-24 w-24 text-white/10" aria-hidden="true" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/25 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald">{summary.count} appartement{summary.count > 1 ? 's' : ''}</span>
                  <div className="relative flex w-full min-w-0 items-end justify-between gap-3 text-white">
                    <div className="min-w-0"><h3 className="break-words text-2xl font-semibold sm:text-3xl">{summary.city}</h3><p className="mt-2 text-sm text-white/80">Gem. {formatPrice(summary.averagePrice)} / maand</p></div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 transition group-hover:bg-white group-hover:text-emerald"><ArrowRight className="h-5 w-5" /></span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
      <section className="bg-sage-50 py-16 sm:py-20">
        <div className="container-app">
          <FadeIn>
            <SectionHeading
              eyebrow="Ervaringen"
              title="Wat onze klanten over Vastgoed Beheer B.V. zeggen"
              description="Feedback van klanten die zijn begeleid bij hun zoektocht naar een woning in Nederland. Blader door 50 ervaringen."
            />
          </FadeIn>

          <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]">
            {DUTCH_TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex min-h-64 w-[85vw] max-w-sm shrink-0 snap-start flex-col rounded-2xl border border-white bg-white p-7 shadow-soft sm:w-80"
              >
                <div className="flex items-center justify-between gap-3">
                  <Quote className="h-7 w-7 text-canal-500" aria-hidden="true" />
                  <div className="flex gap-0.5 text-amber-400" aria-label="5 sterren op 5">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink-600" lang="nl">
                  “{testimonial.text}”
                </blockquote>
                <p className="mt-5 border-t border-ink-100 pt-4 text-sm font-semibold text-ink-700">
                  {testimonial.name}
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
