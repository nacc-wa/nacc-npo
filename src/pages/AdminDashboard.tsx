import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type {
  AdminSnapshot,
  GroundReservation,
  PaymentStatus,
  RegistrationStatus,
  Tournament,
} from '../data/nacc';
import {
  createGroundReservation,
  createTournament,
  getAdminSnapshot,
  isAdminSignedIn,
  signOutAdmin,
  updatePaymentStatus,
  updateRegistrationStatus,
} from '../services/nacc-service';

const registrationStatuses: RegistrationStatus[] = ['submitted', 'approved', 'waitlisted', 'declined'];
const paymentStatuses: PaymentStatus[] = ['pending', 'received', 'waived', 'refunded'];

const emptyTournament: Omit<Tournament, 'id'> = {
  name: '',
  category: 'Adult T20',
  status: 'Coming Soon',
  start_date: '',
  end_date: '',
  registration_deadline: '',
  venue: '',
  format: '',
  fee: '',
  description: '',
  tournament_type: 'adult',
  location: '',
  flyer_url: '',
  highlights: [],
  structure: [],
  registration_url: '',
  registration_label: 'Register Now',
};

const emptyReservation: Omit<GroundReservation, 'id' | 'status'> = {
  ground_id: '',
  tournament_id: '',
  reservation_date: '',
  start_time: '09:00',
  end_time: '17:00',
  assigned_teams: '',
  notes: '',
};

const formatDate = (value: string) =>
  value ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00`)) : '';

const splitLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [snapshot, setSnapshot] = useState<AdminSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [tournamentForm, setTournamentForm] = useState(emptyTournament);
  const [reservationForm, setReservationForm] = useState(emptyReservation);

  const loadSnapshot = async () => {
    setError('');
    const data = await getAdminSnapshot();
    setSnapshot(data);
    setReservationForm((current) => ({
      ...current,
      ground_id: current.ground_id || data.grounds[0]?.id || '',
      tournament_id: current.tournament_id || data.tournaments[0]?.id || '',
    }));
  };

  useEffect(() => {
    isAdminSignedIn()
      .then((signedIn) => {
        if (!signedIn) {
          navigate('/admin/login');
          return;
        }
        return loadSnapshot();
      })
      .catch((issue: unknown) => setError(issue instanceof Error ? issue.message : 'Unable to load admin data.'))
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const metrics = useMemo(() => {
    if (!snapshot) {
      return [];
    }
    return [
      { label: 'Tournaments', value: snapshot.tournaments.length },
      { label: 'Registrations', value: snapshot.registrations.length },
      { label: 'Ground bookings', value: snapshot.reservations.length },
      { label: 'Open contacts', value: snapshot.contacts.filter((contact) => contact.status === 'new').length },
    ];
  }, [snapshot]);

  const handleCreateTournament = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createTournament(tournamentForm);
      setTournamentForm(emptyTournament);
      await loadSnapshot();
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : 'Unable to create tournament.');
    }
  };

  const handleCreateReservation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createGroundReservation(reservationForm);
      setReservationForm((current) => ({ ...emptyReservation, ground_id: current.ground_id, tournament_id: current.tournament_id }));
      await loadSnapshot();
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : 'Unable to create reservation.');
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    navigate('/admin/login');
  };

  if (isLoading) {
    return <div className="container py-20">Loading admin dashboard...</div>;
  }

  if (!snapshot) {
    return <div className="container py-20 text-secondary">{error || 'Admin data unavailable.'}</div>;
  }

  return (
    <div className="bg-surface-container-low py-10">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow mb-2">Operations</p>
            <h1 className="text-3xl font-black">NACC admin dashboard</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="btn btn-secondary">
              Public Site
            </Link>
            <button type="button" className="btn btn-primary" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>

        {error && <div className="mb-6 rounded-md bg-secondary p-4 text-sm text-white">{error}</div>}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="panel p-5">
              <p className="text-3xl font-black text-primary">{metric.value}</p>
              <p className="text-sm font-semibold text-on-surface-variant">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="panel overflow-hidden">
            <div className="border-b border-outline-variant p-5">
              <h2 className="text-xl font-bold">Registrations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-surface-container-low text-xs uppercase text-on-surface-variant">
                  <tr>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3">Captain</th>
                    <th className="px-4 py-3">Tournament</th>
                    <th className="px-4 py-3">Roster</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {snapshot.registrations.map((registration) => {
                    const tournament = snapshot.tournaments.find((item) => item.id === registration.tournament_id);
                    return (
                      <tr key={registration.id}>
                        <td className="px-4 py-3">
                          <p className="font-bold">{registration.team_name}</p>
                          <p className="text-on-surface-variant">{registration.city}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p>{registration.captain_name}</p>
                          <p className="text-on-surface-variant">{registration.captain_email}</p>
                        </td>
                        <td className="px-4 py-3">{tournament?.name ?? registration.tournament_id}</td>
                        <td className="px-4 py-3">{registration.roster_count}</td>
                        <td className="px-4 py-3">
                          <select
                            className="field min-w-36"
                            value={registration.status}
                            onChange={async (event) => {
                              await updateRegistrationStatus(registration.id, event.target.value as RegistrationStatus);
                              await loadSnapshot();
                            }}
                          >
                            {registrationStatuses.map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel p-5">
            <h2 className="mb-5 text-xl font-bold">Create tournament</h2>
            <form className="grid gap-4" onSubmit={handleCreateTournament}>
              <input
                className="field"
                placeholder="Tournament name"
                value={tournamentForm.name}
                onChange={(event) => setTournamentForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="field"
                  placeholder="Category"
                  value={tournamentForm.category}
                  onChange={(event) => setTournamentForm((current) => ({ ...current, category: event.target.value }))}
                  required
                />
                <select
                  className="field"
                  value={tournamentForm.tournament_type}
                  onChange={(event) =>
                    setTournamentForm((current) => ({ ...current, tournament_type: event.target.value as Tournament['tournament_type'] }))
                  }
                >
                  <option value="adult">Adult</option>
                  <option value="youth">Youth</option>
                </select>
                <input
                  className="field"
                  placeholder="Fee"
                  value={tournamentForm.fee}
                  onChange={(event) => setTournamentForm((current) => ({ ...current, fee: event.target.value }))}
                  required
                />
                <input
                  className="field"
                  type="date"
                  value={tournamentForm.start_date}
                  onChange={(event) => setTournamentForm((current) => ({ ...current, start_date: event.target.value }))}
                  required
                />
                <input
                  className="field"
                  type="date"
                  value={tournamentForm.end_date}
                  onChange={(event) => setTournamentForm((current) => ({ ...current, end_date: event.target.value }))}
                  required
                />
                <input
                  className="field"
                  type="date"
                  value={tournamentForm.registration_deadline}
                  onChange={(event) =>
                    setTournamentForm((current) => ({ ...current, registration_deadline: event.target.value }))
                  }
                  required
                />
              </div>
              <input
                className="field"
                placeholder="Venue"
                value={tournamentForm.venue}
                onChange={(event) => setTournamentForm((current) => ({ ...current, venue: event.target.value }))}
                required
              />
              <input
                className="field"
                placeholder="Location, city, or region"
                value={tournamentForm.location}
                onChange={(event) => setTournamentForm((current) => ({ ...current, location: event.target.value }))}
                required
              />
              <input
                className="field"
                placeholder="Format"
                value={tournamentForm.format}
                onChange={(event) => setTournamentForm((current) => ({ ...current, format: event.target.value }))}
                required
              />
              <input
                className="field"
                placeholder="Flyer URL, optional"
                value={tournamentForm.flyer_url}
                onChange={(event) => setTournamentForm((current) => ({ ...current, flyer_url: event.target.value }))}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="field"
                  placeholder="Registration URL, optional"
                  value={tournamentForm.registration_url}
                  onChange={(event) =>
                    setTournamentForm((current) => ({ ...current, registration_url: event.target.value }))
                  }
                />
                <input
                  className="field"
                  placeholder="Registration button label"
                  value={tournamentForm.registration_label}
                  onChange={(event) =>
                    setTournamentForm((current) => ({ ...current, registration_label: event.target.value }))
                  }
                />
              </div>
              <textarea
                className="field min-h-24"
                placeholder="Description"
                value={tournamentForm.description}
                onChange={(event) => setTournamentForm((current) => ({ ...current, description: event.target.value }))}
                required
              />
              <textarea
                className="field min-h-24"
                placeholder="Tournament highlights, one per line"
                value={tournamentForm.highlights.join('\n')}
                onChange={(event) =>
                  setTournamentForm((current) => ({ ...current, highlights: splitLines(event.target.value) }))
                }
              />
              <textarea
                className="field min-h-24"
                placeholder="Tournament structure, one per line"
                value={tournamentForm.structure.join('\n')}
                onChange={(event) =>
                  setTournamentForm((current) => ({ ...current, structure: splitLines(event.target.value) }))
                }
              />
              <button className="btn btn-primary" type="submit">
                Add Tournament
              </button>
            </form>
          </section>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-2">
          <section className="panel p-5">
            <h2 className="mb-5 text-xl font-bold">Ground reservations</h2>
            <form className="mb-6 grid gap-4" onSubmit={handleCreateReservation}>
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  className="field"
                  value={reservationForm.ground_id}
                  onChange={(event) => setReservationForm((current) => ({ ...current, ground_id: event.target.value }))}
                  required
                >
                  {snapshot.grounds.map((ground) => (
                    <option key={ground.id} value={ground.id}>
                      {ground.name}
                    </option>
                  ))}
                </select>
                <select
                  className="field"
                  value={reservationForm.tournament_id}
                  onChange={(event) =>
                    setReservationForm((current) => ({ ...current, tournament_id: event.target.value }))
                  }
                  required
                >
                  {snapshot.tournaments.map((tournament) => (
                    <option key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </option>
                  ))}
                </select>
                <input
                  className="field"
                  type="date"
                  value={reservationForm.reservation_date}
                  onChange={(event) =>
                    setReservationForm((current) => ({ ...current, reservation_date: event.target.value }))
                  }
                  required
                />
                <input
                  className="field"
                  placeholder="Assigned teams"
                  value={reservationForm.assigned_teams}
                  onChange={(event) =>
                    setReservationForm((current) => ({ ...current, assigned_teams: event.target.value }))
                  }
                  required
                />
                <input
                  className="field"
                  type="time"
                  value={reservationForm.start_time}
                  onChange={(event) => setReservationForm((current) => ({ ...current, start_time: event.target.value }))}
                />
                <input
                  className="field"
                  type="time"
                  value={reservationForm.end_time}
                  onChange={(event) => setReservationForm((current) => ({ ...current, end_time: event.target.value }))}
                />
              </div>
              <textarea
                className="field min-h-20"
                placeholder="Notes"
                value={reservationForm.notes}
                onChange={(event) => setReservationForm((current) => ({ ...current, notes: event.target.value }))}
              />
              <button className="btn btn-primary" type="submit">
                Add Reservation
              </button>
            </form>
            <div className="grid gap-3">
              {snapshot.reservations.map((reservation) => {
                const ground = snapshot.grounds.find((item) => item.id === reservation.ground_id);
                return (
                  <div key={reservation.id} className="rounded-md border border-outline-variant bg-surface-container-lowest p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-bold">{ground?.name ?? reservation.ground_id}</p>
                      <span
                        className={`status-pill ${
                          reservation.status === 'conflict' ? 'bg-secondary text-white' : 'bg-primary text-white'
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-on-surface-variant">
                      {formatDate(reservation.reservation_date)} · {reservation.start_time}-{reservation.end_time}
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant">{reservation.assigned_teams}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="panel p-5">
            <h2 className="mb-5 text-xl font-bold">Payments and contacts</h2>
            <div className="grid gap-4">
              {snapshot.payments.map((payment) => (
                <div key={payment.id} className="rounded-md border border-outline-variant p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold">{payment.team_name}</p>
                      <p className="text-sm text-on-surface-variant">
                        {payment.tournament_name} · {payment.amount}
                      </p>
                    </div>
                    <select
                      className="field sm:w-36"
                      value={payment.status}
                      onChange={async (event) => {
                        await updatePaymentStatus(payment.id, event.target.value as PaymentStatus);
                        await loadSnapshot();
                      }}
                    >
                      {paymentStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mb-4 mt-8 text-lg font-bold">Recent contacts</h3>
            <div className="grid gap-3">
              {snapshot.contacts.map((contact) => (
                <div key={contact.id} className="rounded-md border border-outline-variant p-4">
                  <p className="font-bold">{contact.name}</p>
                  <p className="text-sm text-on-surface-variant">
                    {contact.topic} · {contact.email}
                  </p>
                  <p className="mt-2 text-sm text-on-surface-variant">{contact.message}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
