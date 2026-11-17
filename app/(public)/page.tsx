import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, ShieldCheck, KeyRound, CalendarCheck, Building2, Quote, MapPin } from 'lucide-react';
import { HeroSearchBar } from '@/components/properties/hero-search-bar';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { FadeIn } from '@/components/ui/fade-in';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { FeaturedProperties } from '@/components/properties/featured-properties';
import { getCityPropertySummaries, getFeaturedProperties } from '@/lib/data/properties';
import { formatPrice } from '@/lib/utils/format';
import { DUTCH_CITIES } from '@/lib/utils/constants';
import { VERIFIED_DUTCH_TESTIMONIALS } from '@/lib/data/testimonials';

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: 'Vastgoed Beheer B.V. — Appartementen huren in Nederland' },
  alternates: { canonical: '/' },
  description:
    'Vind uw volgende woning in Nederland. Vastgoed Beheer B.V. maakt het zoeken, bezichtigen en reserveren van appartementen in Amsterdam, Rotterdam, Utrecht en daarbuiten eenvoudig.',
};

const STEPS = [
  {
    icon: Building2,
    title: 'Zoek een woning',
    description: 'Filter op stad, budget en aantal slaapkamers uit ons actuele woningaanbod.',
  },
  {
    icon: CalendarCheck,
    title: 'Plan een bezichtiging',
    description: 'Kies een datum en tijdstip en verstuur uw aanvraag naar ons team.',
  },
  {
    icon: ShieldCheck,
    title: 'Verstuur uw reservering',
    description: 'Deel uw huurplannen; ons team beoordeelt daarna uw dossier.',
  },
  {
    icon: KeyRound,
    title: 'Verhuis',
    description: 'Na akkoord over de huur en de afspraken volgt de sleuteloverdracht.',
  },
];

export default async function HomePage() {
  const [citySummaries, featuredProperties] = await Promise.all([
    getCityPropertySummaries(),
    getFeaturedProperties(6),
  ]);

  const heroProperty = featuredProperties.find(property => property.property_images.length > 0);
  const heroImage = heroProperty && (heroProperty.property_images.find(image => image.is_primary) ?? heroProperty.property_images[0]);
  const trustPoints = [
    { value: String(citySummaries.reduce((total, city) => total + city.count, 0)), label: 'woningen in ons aanbod' },
    { value: String(citySummaries.length), label: 'steden om te ontdekken' },
    { value: 'Rotterdam', label: 'de thuisbasis van ons kantoor' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="luxury-home-hero relative isolate bg-sand-100 pb-10 sm:pb-16">
        <div className="relative min-h-[36rem] overflow-hidden bg-emerald-950 pb-32 pt-16 sm:min-h-[42rem] sm:pb-40 sm:pt-24">
          {heroImage && heroProperty ? (
            <HeroParallax><Image src={heroImage.url} alt={heroImage.alt_text || heroProperty.title} fill priority sizes="100vw" className="object-cover object-center" /></HeroParallax>
          ) : <div className="architectural-mark" aria-hidden="true"><span /><span /><span /></div>}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/65 to-emerald-950/20" />
          <div className="container-app relative">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne"><MapPin className="h-3.5 w-3.5" /> Rotterdam · Thuis in Nederland</span>
              <h1 className="mt-6 max-w-3xl font-display text-[3.5rem] leading-[0.98] text-white sm:text-[5.5rem] lg:text-[6.5rem]">
                Een plek om<br /><span className="italic text-champagne">thuis te komen.</span>
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                Vind een woning die bij u past. Vastgoed Beheer B.V. begeleidt u persoonlijk, van de eerste bezichtiging tot de sleuteloverdracht.
              </p>
              <Link href="/appartements" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-md bg-champagne px-6 py-3 text-sm font-semibold text-ink-900 transition hover:bg-champagne-200">Ontdek onze woningen <ArrowRight className="h-4 w-4" /></Link>
              <p className="mt-6 flex items-center gap-2 text-xs text-white/85"><ShieldCheck className="h-4 w-4 text-champagne" /> Persoonlijke begeleiding, van zoeken tot verhuizen</p>
            </FadeIn>
          </div>
          {heroProperty && heroImage && <div className="container-app relative mt-8"><Link href={`/appartements/${heroProperty.slug}`} className="inline-flex max-w-full items-center gap-2 border-b border-white/30 pb-1 text-xs text-white/85"><span className="truncate">Op de foto: {heroProperty.title} · {heroProperty.city}</span><ArrowRight className="h-3.5 w-3.5 shrink-0" /></Link></div>}
        </div>
        <div className="container-app relative z-10 -mt-16 sm:-mt-20">
          <FadeIn delay={0.1}><HeroSearchBar /></FadeIn>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-500"><span className="font-semibold text-emerald">Populaire steden</span>{DUTCH_CITIES.slice(0, 7).map(city => <Link key={city} href={`/appartements?city=${encodeURIComponent(city)}`} className="transition hover:text-emerald hover:underline">{city === 'The Hague' ? 'Den Haag' : city}</Link>)}</div>
        </div>
      </section>

      {/* CHIFFRES DE CONFIANCE */}
      <section className="border-b border-emerald/10 bg-sand-100 py-8">
        <div className="container-app grid grid-cols-1 gap-6 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.label} className="flex min-w-0 flex-col items-start gap-2 border-l border-champagne/50 pl-5">
              <span className="font-display text-4xl text-emerald">{point.value}</span>
              <span className="text-sm text-ink-500">{point.label}</span>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProperties properties={featuredProperties} />

      {/* APPARTEMENTS CLASSÉS PAR VILLE */}
      <section className="py-20 sm:py-28">
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
              <FadeIn key={summary.city} delay={Math.min(index, 6) * 0.04} className={`min-w-0 ${index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <Link href={`/appartements?city=${encodeURIComponent(summary.city)}`} className="group relative flex min-h-72 min-w-0 items-end overflow-hidden rounded-xl bg-emerald-950 p-6 sm:min-h-80">
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

      <section className="border-y border-emerald/10 bg-sage-50 py-20 sm:py-28">
        <div className="container-app grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="relative aspect-[4/3] overflow-hidden rounded-xl bg-emerald">
            {heroImage && heroProperty ? <Image src={heroImage.url} alt={heroImage.alt_text || heroProperty.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" /> : <Building2 className="absolute inset-0 m-auto h-20 w-20 text-champagne" />}
          </FadeIn>
          <FadeIn>
            <span className="editorial-label text-emerald">Vastgoed Beheer B.V. · Rotterdam</span>
            <h2 className="mt-5 text-5xl leading-[1.05] text-emerald sm:text-6xl">Aandacht voor woningen.<br /><span className="italic">Ruimte voor mensen.</span></h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-ink-500">Een nieuwe woning is meer dan een adres. Daarom maken we het zoeken overzichtelijk, met duidelijke woninginformatie en persoonlijk contact bij uw bezichtigings- of reserveringsaanvraag.</p>
            <Link href="/a-propos" className="mt-7 inline-flex items-center gap-4 border-b border-emerald/30 pb-2 text-sm font-semibold text-emerald">Maak kennis met ons <ArrowRight className="h-4 w-4" /></Link>
          </FadeIn>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20 sm:py-28">
        <div className="container-app">
          <FadeIn>
            <SectionHeading
              eyebrow="Uw woonreis"
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
      {VERIFIED_DUTCH_TESTIMONIALS.length > 0 && <section className="bg-sage-50 py-20 sm:py-28">
        <div className="container-app">
          <FadeIn>
            <SectionHeading
              eyebrow="Ervaringen"
              title="Wat onze klanten over Vastgoed Beheer B.V. zeggen"
              description="Ervaringen van klanten met een geverifieerde bron."
            />
          </FadeIn>

          <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:thin]">
            {VERIFIED_DUTCH_TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex min-h-64 w-[85vw] max-w-sm shrink-0 snap-start flex-col rounded-2xl border border-white bg-white p-7 shadow-soft sm:w-80"
              >
                <div className="flex items-center justify-between gap-3">
                  <Quote className="h-7 w-7 text-canal-500" aria-hidden="true" />

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
      </section>}

      {/* CTA FINAL */}
      <section className="pb-20">
        <div className="container-app">
          <FadeIn>
            <div className="luxury-cta relative overflow-hidden rounded-xl bg-emerald px-6 py-14 text-center sm:px-16">
              <h2 className="text-display-sm font-extrabold text-white sm:text-display-md">
                Klaar om uw nieuwe woning te vinden?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sand-200">
                Ontdek ons woningaanbod en vraag een bezichtiging aan op een moment dat bij u past.
              </p>
              <Link href="/appartements" className="mt-7 inline-block">
                <Button variant="primary" size="lg">
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
