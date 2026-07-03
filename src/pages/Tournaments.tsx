import { CalendarDaysIcon, MapPinIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Tournament } from '../data/nacc';
import { getPublicTournaments } from '../services/nacc-service';

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(`${value}T12:00:00`),
  );

const getStatusClass = (status: Tournament['status']) => {
  if (status === 'Registration Open') {
    return 'bg-secondary text-white';
  }
  if (status === 'In Progress') {
    return 'bg-primary text-white';
  }
  if (status === 'Completed') {
    return 'bg-surface-container text-dark';
  }
  return 'bg-surface-container text-dark';
};

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicTournaments()
      .then(setTournaments)
      .catch((issue: unknown) => setError(issue instanceof Error ? issue.message : 'Unable to load tournaments.'));
  }, []);

  return (
    <div className="bg-surface py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Tournament calendar</p>
          <h1 className="section-title">Structured cricket events that bring communities together.</h1>
          <p className="section-copy mt-5">
            View upcoming NACC tournaments, registration windows, formats, entry fees,
            and venue planning details.
          </p>
        </div>

        {error && (
          <div className="mt-8 rounded-md bg-secondary p-4 text-sm text-white">
            {error}
          </div>
        )}

        {tournaments.length === 0 && !error && (
          <div className="panel mt-12 p-8 text-on-surface-variant">
            No tournaments are published yet.
          </div>
        )}

        <div className="mt-12 grid gap-6">
          {tournaments.map((tournament) => {
            return (
              <article key={tournament.id} className="panel overflow-hidden">
                <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px]">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className={`status-pill ${getStatusClass(tournament.status)}`}>
                        {tournament.status}
                      </span>
                      <span className="text-sm font-semibold text-on-surface-variant">{tournament.category}</span>
                    </div>
                    <h2 className="text-2xl font-black text-dark">{tournament.name}</h2>
                    <p className="mt-3 leading-7 text-on-surface-variant">{tournament.description}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="flex gap-3">
                        <CalendarDaysIcon className="h-6 w-6 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-bold text-on-surface">
                            {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                          </p>
                          <p className="text-sm text-on-surface-variant">
                            Deadline: {formatDate(tournament.registration_deadline)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <MapPinIcon className="h-6 w-6 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-bold text-on-surface">{tournament.venue}</p>
                          <p className="text-sm text-on-surface-variant">{tournament.format}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-surface-container-low p-5">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <TrophyIcon className="h-6 w-6 text-accent" />
                        <div>
                          <p className="font-bold">{tournament.fee}</p>
                          <p className="text-sm text-on-surface-variant">entry fee</p>
                        </div>
                      </div>
                      <Link to={`/tournaments/${tournament.id}`} className="btn btn-primary">
                        View Details
                      </Link>
                      {tournament.registration_url ? (
                        <a
                          href={tournament.registration_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-accent"
                        >
                          {tournament.registration_label}
                        </a>
                      ) : tournament.status === 'Registration Open' ? (
                        <Link to={`/register?tournament=${tournament.id}`} className="btn btn-accent">
                          Register Now
                        </Link>
                      ) : (
                        <Link to="/contact" className="btn btn-secondary">
                          Ask About This Event
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tournaments;
