import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Sportsmanship',
    description: 'We expect every tournament to reflect respect, fairness, discipline, and shared joy.',
  },
  {
    title: 'Teamwork',
    description: 'Players, captains, volunteers, families, and partners all contribute to a stronger cricket culture.',
  },
  {
    title: 'Inclusivity',
    description: 'NACC welcomes Youth and Adult teams, families, and communities of every background.',
  },
  {
    title: 'Growth',
    description: 'We use organized tournaments to grow cricket participation from Washington to more regions over time.',
  },
];

const timeline = [
  'Organize Youth tournaments from U-11 and up, alongside Adult competitions.',
  'Coordinate teams, venues, grounds, registrations, payments, and event communication.',
  'Bring communities together through competitive and festival-style cricket events.',
  'Expand from our Washington base toward a broader regional NACC tournament calendar.',
];

const About = () => {
  return (
    <div className="bg-surface">
      <section className="bg-primary py-20 text-white">
        <div className="container">
          <p className="eyebrow mb-4">About NACC</p>
          <h1 className="max-w-4xl text-4xl font-black sm:text-6xl">
            Cricket as a cornerstone of unity and personal growth.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
            North America Cricket Conference is a non-profit organization dedicated to
            growing cricket in the United States through organized Youth and Adult
            tournaments. NACC is rooted in Washington today, with a long-term vision
            to bring inclusive cricket events to more regions.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow mb-3">What we do</p>
            <h2 className="section-title">Tournament operations for all age groups.</h2>
          </div>
          <div className="grid gap-6">
            <p className="section-copy">
              NACC creates organized cricket opportunities by planning tournaments,
              managing registration, coordinating grounds, communicating with teams,
              and supporting event-day operations for Youth and Adult competition.
            </p>
            <p className="section-copy">
              We believe in the power of sports to unite and uplift. NACC is committed
              to building a reliable tournament platform that helps cricket communities
              gather, compete, volunteer, sponsor, and grow together.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-20">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow mb-3">Values</p>
            <h2 className="section-title">The spirit of cricket guides the organization.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="panel p-6">
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="text-sm leading-6 text-on-surface-variant">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-3">Community model</p>
            <h2 className="section-title">A practical path from local events to national reach.</h2>
          </div>
          <div className="grid gap-4">
            {timeline.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="self-center text-on-surface-variant">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container">
          <div className="rounded-lg bg-primary p-8 text-white">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-2xl font-bold">Bring NACC tournaments to your community.</h2>
                <p className="mt-3 max-w-3xl text-white/80">
                  Parks, grounds, team captains, sponsors, and volunteers can start a
                  conversation about hosting or supporting Youth and Adult cricket events.
                </p>
              </div>
              <Link to="/contact" className="btn btn-secondary">
                Partner With NACC
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
