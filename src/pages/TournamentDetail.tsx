import { CalendarDaysIcon, MapPinIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Tournament } from '../data/nacc';
import { getPublicTournaments } from '../services/nacc-service';

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(`${value}T12:00:00`),
  );

const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPublicTournaments()
      .then(setTournaments)
      .catch((issue: unknown) => setError(issue instanceof Error ? issue.message : 'Unable to load tournament.'))
      .finally(() => setIsLoading(false));
  }, []);

  const tournament = useMemo(
    () => tournaments.find((item) => item.id === tournamentId),
    [tournamentId, tournaments],
  );

  if (error) {
    return (
      <div className="bg-surface py-20">
        <div className="container">
          <div className="rounded-md bg-secondary p-4 text-sm text-white">{error}</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-surface py-20">
        <div className="container">
          <div className="panel p-8">Loading tournament...</div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="bg-surface py-20">
        <div className="container">
          <div className="panel p-8">
            <p className="eyebrow mb-3">Tournament not found</p>
            <h1 className="section-title">We could not find that tournament.</h1>
            <Link to="/tournaments" className="btn btn-primary mt-6">
              Back to Tournament Calendar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const dateRange = `${formatDate(tournament.start_date)} - ${formatDate(tournament.end_date)}`;
  const hasRegistrationLink = Boolean(tournament.registration_url);

  return (
    <div className="bg-surface py-20">
      <div className="container">
        <div className="mb-8">
          <Link to="/tournaments" className="btn btn-secondary">
            Back to Tournament Calendar
          </Link>
        </div>

        <section className="panel overflow-hidden">
          <div className={tournament.flyer_url ? 'grid gap-0 lg:grid-cols-[0.9fr_1.1fr]' : 'grid gap-0'}>
            {tournament.flyer_url && (
              <div className="bg-primary p-4 sm:p-6">
                <img
                  src={tournament.flyer_url}
                  alt={`${tournament.name} flyer`}
                  className="mx-auto aspect-[498/744] w-full max-w-md rounded-lg border border-white/15 object-cover"
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="status-pill bg-secondary text-white">{tournament.status}</span>
                <span className="status-pill bg-primary text-white">{tournament.tournament_type}</span>
                <span className="status-pill bg-surface-container text-dark">{tournament.category}</span>
              </div>

              <p className="eyebrow mb-3">Tournament details</p>
              <h1 className="text-4xl font-black text-dark sm:text-5xl">{tournament.name}</h1>
              <p className="mt-3 text-lg font-bold text-secondary">{tournament.category}</p>

              <p className="mt-6 leading-7 text-on-surface-variant">{tournament.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-md bg-surface-container-low p-4">
                  <CalendarDaysIcon className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold text-on-surface">{dateRange}</p>
                    <p className="text-sm text-on-surface-variant">
                      Registration deadline: {formatDate(tournament.registration_deadline)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-md bg-surface-container-low p-4">
                  <MapPinIcon className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold text-on-surface">{tournament.location}</p>
                    <p className="text-sm text-on-surface-variant">{tournament.venue}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-md bg-surface-container-low p-4">
                  <TrophyIcon className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <p className="font-bold text-on-surface">{tournament.format}</p>
                    <p className="text-sm text-on-surface-variant">{tournament.fee}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {tournament.highlights.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-dark">Tournament Highlights</h2>
                    <ul className="mt-4 grid gap-3 text-sm leading-6 text-on-surface-variant">
                      {tournament.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tournament.structure.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-dark">Tournament Structure</h2>
                    <ul className="mt-4 grid gap-3 text-sm leading-6 text-on-surface-variant">
                      {tournament.structure.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {hasRegistrationLink ? (
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
                    {tournament.registration_label}
                  </Link>
                ) : null}
                <Link to="/contact" className="btn btn-secondary">
                  Ask About This Event
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TournamentDetail;
