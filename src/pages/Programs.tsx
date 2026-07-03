import { Link } from 'react-router-dom';

const programs = [
  {
    audience: 'Children',
    title: 'Foundations of Cricket',
    details:
      'Introductory clinics focused on batting, bowling, fielding, teamwork, safety, and joy in movement.',
    cadence: 'Weekend clinics and seasonal camps',
  },
  {
    audience: 'Teens',
    title: 'Skill Development and Mentorship',
    details:
      'Age-group training with match scenarios, leadership habits, fitness, confidence, and role-specific coaching.',
    cadence: 'Weekly training blocks and tournament preparation',
  },
  {
    audience: 'Adults',
    title: 'Community Competition',
    details:
      'Organized fixtures, T20 and T10 tournaments, clear registration workflows, and team communication support.',
    cadence: 'Seasonal leagues and community cups',
  },
  {
    audience: 'Volunteers',
    title: 'Coach and Organizer Pathways',
    details:
      'Opportunities to support clinics, scoring, ground setup, team coordination, sponsorship, and event operations.',
    cadence: 'Event-based and season-long roles',
  },
];

const Programs = () => {
  return (
    <div className="bg-surface py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Programs</p>
          <h1 className="section-title">Cricket pathways for every age and role.</h1>
          <p className="section-copy mt-5">
            NACC programs are built to meet people where they are: young beginners,
            developing teens, adult teams, families, volunteers, and community partners.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {programs.map((program) => (
            <article key={program.title} className="panel p-7">
              <p className="mb-3 text-sm font-bold uppercase text-accent">
                {program.audience}
              </p>
              <h2 className="text-2xl font-bold">{program.title}</h2>
              <p className="mt-4 leading-7 text-on-surface-variant">{program.details}</p>
              <div className="mt-6 rounded-md bg-surface-container-low p-4 text-sm font-semibold text-primary">
                {program.cadence}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-primary p-8 text-white">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold">Bring NACC programming to your community.</h2>
              <p className="mt-3 max-w-3xl text-white/80">
                Schools, parks, team captains, sponsors, and volunteers can use the contact
                form to start a conversation about clinics, tournaments, or local partnerships.
              </p>
            </div>
            <Link to="/contact" className="btn btn-secondary">
              Partner With NACC
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
