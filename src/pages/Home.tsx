import {
  MapPinIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const pillars = [
  {
    title: 'Youth Competition',
    description: 'Age-group tournaments from U-11 and up, built for organized, competitive cricket.',
    icon: UserGroupIcon,
  },
  {
    title: 'Adult Competition',
    description: 'Structured tournaments and community fixtures for clubs, teams, and independent players.',
    icon: TrophyIcon,
  },
  {
    title: 'Regional Growth',
    description: 'Washington is our current base, with a long-term vision to expand NACC events across every region.',
    icon: MapPinIcon,
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
              NACC grows cricket in the USA by organizing inclusive Youth and Adult
              tournaments that give players, teams, families, and communities a place
              to compete, connect, and celebrate the sport.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="btn btn-accent">
                Register a Team
              </Link>
              <Link to="/tournaments" className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20">
                View Tournament Calendar
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
              Our mission is to inspire and grow a love for cricket across the USA by
              creating well-run tournaments for players of all ages. We currently serve
              cricket communities from Washington, with a long-term vision to bring NACC
              events to more regions across the country.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="panel p-6">
                  <Icon className="mb-5 h-10 w-10 text-primary" />
                  <h3 className="mb-3 text-xl font-bold">{pillar.title}</h3>
                  <p className="text-sm leading-6 text-on-surface-variant">{pillar.description}</p>
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
              NACC is designed for Youth players starting at U-11, Adult teams seeking
              organized competition, families supporting the game, and community leaders
              who want cricket events that are reliable, inclusive, and competitive.
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
            {['Youth U-11+', 'Adult Teams', 'Families', 'Community partners'].map((audience) => (
              <div key={audience} className="panel p-6">
                <UserGroupIcon className="mb-4 h-8 w-8 text-accent" />
                <p className="text-lg font-bold">{audience}</p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Tournament-centered participation with clear registration and event operations.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
