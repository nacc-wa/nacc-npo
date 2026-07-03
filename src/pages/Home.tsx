import {
  ClipboardDocumentCheckIcon,
  MapPinIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const eventStandards = [
  {
    title: 'Clear Registration',
    description: 'Teams and players get a straightforward path from interest to confirmed participation.',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    title: 'Reliable Venues',
    description: 'Grounds, dates, formats, and match logistics are coordinated before event day.',
    icon: MapPinIcon,
  },
  {
    title: 'Competitive Atmosphere',
    description: 'Events are built around fair play, strong communication, and a shared respect for cricket.',
    icon: TrophyIcon,
  },
];

const audiences = [
  {
    title: 'Youth U-11+',
    description: 'Age-group events give young cricketers meaningful match experience.',
  },
  {
    title: 'Adult Teams',
    description: 'Clubs and captains can find organized formats with clear next steps.',
  },
  {
    title: 'Families',
    description: 'Tournament weekends create a shared place to support players and meet the community.',
  },
  {
    title: 'Community Partners',
    description: 'Grounds, sponsors, and volunteers help scale cricket beyond one event at a time.',
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-secondary/70" />
        <div className="container relative flex min-h-[calc(100vh-80px)] items-center py-16">
          <div className="max-w-4xl">
            <p className="eyebrow mb-5">North America Cricket Conference</p>
            <h1 className="text-4xl font-black sm:text-6xl lg:text-7xl">
              Growing cricket as a source of unity, joy, and opportunity.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200 sm:text-xl">
              NACC organizes Youth and Adult cricket tournaments that give players,
              teams, families, and supporters a dependable place to compete and connect.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/tournaments" className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20">
                View Tournament Calendar
              </Link>
              <Link to="/contact" className="btn btn-accent">
                Partner With NACC
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">Mission</p>
              <h2 className="section-title">A national cricket community built from the ground up.</h2>
            </div>
            <p className="section-copy">
              We are rooted in Washington today and building toward a broader regional
              calendar across the USA. Each event is a practical step toward stronger
              cricket infrastructure, better team coordination, and more visible pathways
              for the sport.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {eventStandards.map((standard) => {
              const Icon = standard.icon;
              return (
                <article key={standard.title} className="panel p-6">
                  <Icon className="mb-5 h-10 w-10 text-primary" />
                  <h3 className="mb-3 text-xl font-bold">{standard.title}</h3>
                  <p className="text-sm leading-6 text-on-surface-variant">{standard.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-20">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-3">Who we serve</p>
            <h2 className="section-title">Youth and Adult tournament pathways.</h2>
            <p className="section-copy mt-5">
              NACC brings together the people required to make cricket weekends work:
              players, captains, families, volunteers, sponsors, and grounds partners.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/tournaments" className="btn btn-primary">
                View Tournaments
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Partner With NACC
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div key={audience.title} className="panel p-6">
                <UserGroupIcon className="mb-4 h-8 w-8 text-accent" />
                <p className="text-lg font-bold">{audience.title}</p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
