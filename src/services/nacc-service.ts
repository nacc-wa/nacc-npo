import {
  type AdminSnapshot,
  type ContactRecord,
  type Ground,
  type GroundReservation,
  type PaymentRecord,
  type PaymentStatus,
  type Registration,
  type RegistrationStatus,
  type Team,
  type Tournament,
} from '../data/nacc';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type TableName =
  | 'tournaments'
  | 'teams'
  | 'registrations'
  | 'grounds'
  | 'ground_reservations'
  | 'contacts'
  | 'payments';

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const getSupabaseClient = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.');
  }

  return supabase;
};

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
};

const normalizeTournament = (tournament: Tournament): Tournament => ({
  ...tournament,
  tournament_type: tournament.tournament_type === 'youth' ? 'youth' : 'adult',
  location: tournament.location || tournament.venue,
  flyer_url: tournament.flyer_url || '',
  highlights: asStringArray(tournament.highlights),
  structure: asStringArray(tournament.structure),
  registration_url: tournament.registration_url || '',
  registration_label: tournament.registration_label || 'Register Now',
});

const selectAll = async <T,>(table: TableName): Promise<T[]> => {
  const client = getSupabaseClient();

  const { data, error } = await client.from(table).select('*');
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as T[];
};

export const getPublicTournaments = async (): Promise<Tournament[]> => {
  const tournaments = await selectAll<Tournament>('tournaments');
  return tournaments.map(normalizeTournament);
};

export const getAdminSnapshot = async (): Promise<AdminSnapshot> => {
  const [tournaments, registrations, teams, grounds, reservations, contacts, payments] =
    await Promise.all([
      selectAll<Tournament>('tournaments'),
      selectAll<Registration>('registrations'),
      selectAll<Team>('teams'),
      selectAll<Ground>('grounds'),
      selectAll<GroundReservation>('ground_reservations'),
      selectAll<ContactRecord>('contacts'),
      selectAll<PaymentRecord>('payments'),
    ]);

  return { tournaments: tournaments.map(normalizeTournament), registrations, teams, grounds, reservations, contacts, payments };
};

export const submitRegistration = async (
  registration: Omit<Registration, 'id' | 'status' | 'created_at'>,
) => {
  const payload: Registration = {
    ...registration,
    id: createId('reg'),
    status: 'submitted',
    created_at: new Date().toISOString(),
  };

  const { error } = await getSupabaseClient().from('registrations').insert(payload);
  if (error) {
    throw new Error(error.message);
  }
  return payload;
};

export const submitContact = async (
  contact: Omit<ContactRecord, 'id' | 'status' | 'created_at'>,
) => {
  const payload: ContactRecord = {
    ...contact,
    id: createId('contact'),
    status: 'new',
    created_at: new Date().toISOString(),
  };

  const { error } = await getSupabaseClient().from('contacts').insert(payload);
  if (error) {
    throw new Error(error.message);
  }
  return payload;
};

export const signInAdmin = async (email: string, password: string) => {
  const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(error.message);
  }
};

export const signOutAdmin = async () => {
  await getSupabaseClient().auth.signOut();
};

export const isAdminSignedIn = async () => {
  const { data } = await getSupabaseClient().auth.getSession();
  return Boolean(data.session);
};

export const createTournament = async (
  tournament: Omit<Tournament, 'id'>,
) => {
  const payload: Tournament = {
    ...normalizeTournament(tournament as Tournament),
    id: createId('tournament'),
  };

  const { error } = await getSupabaseClient().from('tournaments').insert(payload);
  if (error) {
    throw new Error(error.message);
  }
  return payload;
};

export const createGroundReservation = async (
  reservation: Omit<GroundReservation, 'id' | 'status'>,
) => {
  const client = getSupabaseClient();
  const { data: existingReservations, error: reservationsError } = await client
    .from('ground_reservations')
    .select('*')
    .eq('ground_id', reservation.ground_id)
    .eq('reservation_date', reservation.reservation_date);

  if (reservationsError) {
    throw new Error(reservationsError.message);
  }

  const conflict = ((existingReservations ?? []) as GroundReservation[]).some(
    (existing) =>
      existing.status !== 'released' &&
      existing.start_time < reservation.end_time &&
      reservation.start_time < existing.end_time,
  );

  const payload: GroundReservation = {
    ...reservation,
    id: createId('reservation'),
    status: conflict ? 'conflict' : 'requested',
  };

  const { error } = await client.from('ground_reservations').insert(payload);
  if (error) {
    throw new Error(error.message);
  }
  return payload;
};

export const updateRegistrationStatus = async (id: string, status: RegistrationStatus) => {
  const { error } = await getSupabaseClient().from('registrations').update({ status }).eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
};

export const updatePaymentStatus = async (id: string, status: PaymentStatus) => {
  const { error } = await getSupabaseClient().from('payments').update({ status }).eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
};
