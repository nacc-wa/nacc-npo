import {
  AcademicCapIcon,
  HeartIcon,
  TrophyIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const pillars = [
  {
    title: 'Learn',
    description: 'Accessible coaching, fundamentals, rules education, and skill-building clinics.',
    icon: AcademicCapIcon,
  },
  {
    title: 'Play',
    description: 'Structured tournaments and community fixtures for new and experienced players.',
    icon: TrophyIcon,
  },
  {
    title: 'Thrive',
    description: 'Mentorship, leadership opportunities, and pathways for the next cricket leaders.',
    icon: HeartIcon,
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
              NACC inspires a love for cricket across the USA by creating opportunities
              for children, teens, and adults to learn, play, and thrive through coaching,
              mentorship, skill development, and inclusive tournaments.
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
              creating opportunities for individuals of all ages to learn, play, and thrive.
              We foster talent and passion through coaching, mentorship, and skill development
              while promoting competitive tournaments that bring communities together.
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
            <p className="eyebrow mb-3">Programs</p>
            <h2 className="section-title">Coaching, mentorship, tournaments, and volunteer pathways.</h2>
            <p className="section-copy mt-5">
              NACC is designed for families discovering cricket, young players developing
              fundamentals, adult teams seeking organized competition, and community leaders
              who want to use sport to bring people together.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/programs" className="btn btn-primary">
                Explore Programs
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Become a Volunteer
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Children', 'Teens', 'Adults', 'Community partners'].map((audience) => (
              <div key={audience} className="panel p-6">
                <UserGroupIcon className="mb-4 h-8 w-8 text-accent" />
                <p className="text-lg font-bold">{audience}</p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Age-aware programming with inclusive expectations and clear next steps.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
