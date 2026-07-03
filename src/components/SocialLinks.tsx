import { socialLinks } from '../data/social';

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
  showLabels?: boolean;
}

type SocialIconName = (typeof socialLinks)[number]['icon'];

const SocialIcon = ({ icon }: { icon: SocialIconName }) => {
  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    );
  }

  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M14 8.5V6.75c0-.5.42-.75.9-.75H17V2.25C16.4 2.16 15.5 2 14.4 2 12.05 2 10.5 3.43 10.5 6.05V8.5H8v4h2.5V22H15v-9.5h3l.5-4H15Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.65 4.6 12 4.6 12 4.6s-5.65 0-7.5.5a3 3 0 0 0-2.1 2.1A31.6 31.6 0 0 0 2 12a31.6 31.6 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.85.5 7.5.5 7.5.5s5.65 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 22 12a31.6 31.6 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
};

const SocialLinks = ({ className = '', linkClassName = '', showLabels = false }: SocialLinksProps) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-white/20 px-3 text-xs font-black text-white transition hover:bg-white/10 ${linkClassName}`}
          aria-label={`Follow NACC on ${link.label}`}
          title={link.label}
        >
          <SocialIcon icon={link.icon} />
          {showLabels && <span className="ml-2">{link.label}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
