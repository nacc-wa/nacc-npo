export type TournamentStatus = 'Registration Open' | 'Coming Soon' | 'In Progress' | 'Completed';
export type TournamentType = 'youth' | 'adult';
export type RegistrationStatus = 'submitted' | 'approved' | 'waitlisted' | 'declined';
export type ReservationStatus = 'requested' | 'confirmed' | 'conflict' | 'released';
export type PaymentStatus = 'pending' | 'received' | 'waived' | 'refunded';

export interface Tournament {
  id: string;
  name: string;
  category: string;
  status: TournamentStatus;
  start_date: string;
  end_date: string;
  registration_deadline: string;
  venue: string;
  format: string;
  fee: string;
  description: string;
  tournament_type: TournamentType;
  location: string;
  flyer_url: string;
  highlights: string[];
  structure: string[];
  registration_url: string;
  registration_label: string;
}

export interface Team {
  id: string;
  name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  city: string;
}

export interface Registration {
  id: string;
  tournament_id: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  city: string;
  age_category: string;
  roster_count: number;
  notes: string;
  status: RegistrationStatus;
  created_at: string;
}

export interface Ground {
  id: string;
  name: string;
  address: string;
  city: string;
  surface: string;
}

export interface GroundReservation {
  id: string;
  ground_id: string;
  tournament_id: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  assigned_teams: string;
  status: ReservationStatus;
  notes: string;
}

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export interface PaymentRecord {
  id: string;
  registration_id: string;
  team_name: string;
  tournament_name: string;
  amount: string;
  method: string;
  status: PaymentStatus;
  reference: string;
}

export interface AdminSnapshot {
  tournaments: Tournament[];
  registrations: Registration[];
  teams: Team[];
  grounds: Ground[];
  reservations: GroundReservation[];
  contacts: ContactRecord[];
  payments: PaymentRecord[];
}
