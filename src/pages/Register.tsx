import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import type { Tournament } from '../data/nacc';
import { getPublicTournaments, submitRegistration } from '../services/nacc-service';

interface RegistrationForm {
  tournament_id: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  city: string;
  age_category: string;
  roster_count: number;
  notes: string;
}

const emptyForm: RegistrationForm = {
  tournament_id: '',
  team_name: '',
  captain_name: '',
  captain_email: '',
  captain_phone: '',
  city: '',
  age_category: 'Adult',
  roster_count: 14,
  notes: '',
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const requestedTournament = searchParams.get('tournament');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [form, setForm] = useState<RegistrationForm>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getPublicTournaments()
      .then((items) => {
        setTournaments(items);
        setForm((current) => ({ ...current, tournament_id: requestedTournament ?? '' }));
      })
      .catch((issue: unknown) => {
        setStatus('error');
        setMessage(issue instanceof Error ? issue.message : 'Unable to load tournaments.');
      });
  }, [requestedTournament]);

  const selectedTournament = useMemo(
    () => tournaments.find((tournament) => tournament.id === form.tournament_id),
    [form.tournament_id, tournaments],
  );

  const updateField = <Field extends keyof RegistrationForm>(field: Field, value: RegistrationForm[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      await submitRegistration(form);
      setStatus('success');
      setMessage('Registration submitted. NACC will review it and follow up with confirmation and payment details.');
      setForm((current) => ({
        ...emptyForm,
        tournament_id: current.tournament_id,
      }));
    } catch (issue) {
      setStatus('error');
      setMessage(issue instanceof Error ? issue.message : 'Registration could not be submitted.');
    }
  };

  if (!requestedTournament) {
    return <Navigate to="/tournaments" replace />;
  }

  return (
    <div className="bg-surface py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-3">Team registration</p>
            <h1 className="section-title">Register for an upcoming NACC tournament.</h1>
            <p className="section-copy mt-5">
              Submit team and captain details. Admins can review submissions, coordinate
              follow-up, update approval status, and track payments in the operations dashboard.
            </p>

            <div className="panel mt-8 p-6">
              <h2 className="mb-4 text-xl font-bold">Registration process</h2>
              <ol className="grid gap-4 text-sm leading-6 text-on-surface-variant">
                <li><strong className="text-on-surface">1.</strong> Submit team and captain details.</li>
                <li><strong className="text-on-surface">2.</strong> NACC reviews eligibility and availability.</li>
                <li><strong className="text-on-surface">3.</strong> Approved teams receive payment instructions.</li>
                <li><strong className="text-on-surface">4.</strong> Teams are confirmed after payment is received.</li>
              </ol>
            </div>
          </div>

          <form className="panel p-6" onSubmit={handleSubmit}>
            {selectedTournament && (
              <div className="mb-6 rounded-md bg-surface-container-low p-4">
                <p className="text-sm font-bold text-primary">Selected tournament</p>
                <p className="mt-1 text-lg font-bold">{selectedTournament.name}</p>
                <p className="text-sm text-on-surface-variant">{selectedTournament.fee}</p>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="label">Tournament</span>
                <select
                  className="field"
                  value={form.tournament_id}
                  onChange={(event) => updateField('tournament_id', event.target.value)}
                  required
                >
                  {tournaments.map((tournament) => (
                    <option key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="label">Age category</span>
                <select
                  className="field"
                  value={form.age_category}
                  onChange={(event) => updateField('age_category', event.target.value)}
                >
                  <option>Adult</option>
                  <option>Youth U11</option>
                  <option>Youth U13</option>
                  <option>Youth U15</option>
                  <option>Youth U17</option>
                  <option>Open Community</option>
                </select>
              </label>

              <label>
                <span className="label">Team name</span>
                <input
                  className="field"
                  value={form.team_name}
                  onChange={(event) => updateField('team_name', event.target.value)}
                  required
                />
              </label>

              <label>
                <span className="label">Home city</span>
                <input
                  className="field"
                  value={form.city}
                  onChange={(event) => updateField('city', event.target.value)}
                  required
                />
              </label>

              <label>
                <span className="label">Captain name</span>
                <input
                  className="field"
                  value={form.captain_name}
                  onChange={(event) => updateField('captain_name', event.target.value)}
                  required
                />
              </label>

              <label>
                <span className="label">Captain email</span>
                <input
                  className="field"
                  type="email"
                  value={form.captain_email}
                  onChange={(event) => updateField('captain_email', event.target.value)}
                  required
                />
              </label>

              <label>
                <span className="label">Captain phone</span>
                <input
                  className="field"
                  value={form.captain_phone}
                  onChange={(event) => updateField('captain_phone', event.target.value)}
                  required
                />
              </label>

              <label>
                <span className="label">Roster count</span>
                <input
                  className="field"
                  type="number"
                  min={1}
                  max={30}
                  value={form.roster_count}
                  onChange={(event) => updateField('roster_count', Number(event.target.value))}
                  required
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="label">Notes</span>
              <textarea
                className="field min-h-32"
                value={form.notes}
                onChange={(event) => updateField('notes', event.target.value)}
                placeholder="Scheduling constraints, volunteer offers, age-group details, or questions."
              />
            </label>

            {message && (
              <div
                className={`mt-5 rounded-md p-4 text-sm ${
                  status === 'success' ? 'bg-surface-container text-primary' : 'bg-secondary text-white'
                }`}
              >
                {message}
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-6 w-full" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting...' : 'Submit Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
