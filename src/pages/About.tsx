const values = [
  {
    title: 'Sportsmanship',
    description: 'We teach cricket as a game of respect, fairness, discipline, and shared joy.',
  },
  {
    title: 'Teamwork',
    description: 'Players, coaches, volunteers, and families all contribute to a stronger cricket culture.',
  },
  {
    title: 'Inclusivity',
    description: 'NACC welcomes beginners, experienced players, families, and communities of every background.',
  },
  {
    title: 'Growth',
    description: 'We build skill, confidence, leadership, and long-term love for the game.',
  },
];

const timeline = [
  'Introduce cricket through clinics, camps, and school/community partnerships.',
  'Develop players with age-aware coaching, mentoring, and structured practice.',
  'Bring communities together through competitive and festival-style tournaments.',
  'Create leadership opportunities for players, parents, coaches, and volunteers.',
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
            inspiring a love for cricket across the United States by providing opportunities
            for children, teens, and adults to engage with the sport.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow mb-3">What we do</p>
            <h2 className="section-title">Accessible coaching and organized competition.</h2>
          </div>
          <div className="grid gap-6">
            <p className="section-copy">
              Our programs offer coaching, mentorship, and skill development that help
              participants learn, play, and thrive. Through competitive tournaments and
              community-driven initiatives, we promote cricket while fostering teamwork,
              sportsmanship, and inclusivity.
            </p>
            <p className="section-copy">
              We believe in the power of sports to unite and uplift. NACC is committed
              to cultivating the next generation of cricket enthusiasts, volunteers,
              coaches, and community leaders.
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
            <h2 className="section-title">A practical path from first session to lifelong involvement.</h2>
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
    </div>
  );
};

export default About;
