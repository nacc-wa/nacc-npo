const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <img src="/nacc-logo.svg" alt="NACC logo" className="h-12 w-12 rounded-md bg-white object-contain" />
              <div>
                <p className="font-black">NACC</p>
                <p className="text-sm text-gray-400">North America Cricket Conference</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-300">
              Inspiring and growing cricket across the USA through accessible coaching,
              inclusive tournaments, mentorship, and community-driven development.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold uppercase text-white/60">Connect</h2>
            <ul className="grid gap-2 text-sm text-gray-300">
              <li>admin@northamericacricketconference.org</li>
              <li>support@northamericacricketconference.org</li>
              <li>Serving cricket communities across the USA</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/45">
          <p>&copy; {currentYear} North America Cricket Conference. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
