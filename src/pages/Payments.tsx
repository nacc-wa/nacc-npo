import { BanknotesIcon, CheckCircleIcon, CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const paymentMethods = [
  {
    title: 'Zelle or bank transfer',
    description: 'Preferred for team entry fees after registration approval.',
    detail: 'Use the team name and tournament code in the payment reference.',
    icon: BanknotesIcon,
  },
  {
    title: 'Card payment',
    description: 'Available when a hosted payment link is issued by NACC staff.',
    detail: 'Processing fees may apply when card payments are enabled.',
    icon: CreditCardIcon,
  },
  {
    title: 'Sponsor or waiver tracking',
    description: 'Admins can mark approved registrations as waived or sponsored.',
    detail: 'Useful for community access, youth support, and nonprofit partnerships.',
    icon: ShieldCheckIcon,
  },
];

const Payments = () => {
  return (
    <div className="bg-surface py-20">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Payments and donations</p>
          <h1 className="section-title">Simple payment tracking for tournament operations.</h1>
          <p className="section-copy mt-5">
            NACC confirms tournament spots after registration review and payment confirmation.
            Live checkout is intentionally not part of this MVP; admins track payment status
            and references in the operations dashboard.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <article key={method.title} className="panel p-6">
                <Icon className="mb-5 h-9 w-9 text-primary" />
                <h2 className="text-xl font-bold">{method.title}</h2>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{method.description}</p>
                <p className="mt-4 rounded-md bg-surface-container-low p-3 text-sm font-semibold text-on-surface-variant">
                  {method.detail}
                </p>
              </article>
            );
          })}
        </div>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="panel p-7">
            <h2 className="mb-5 text-2xl font-bold">Payment instructions</h2>
            <ol className="grid gap-4 text-on-surface-variant">
              <li className="flex gap-3">
                <CheckCircleIcon className="h-6 w-6 shrink-0 text-secondary" />
                Register your team through the tournament registration form.
              </li>
              <li className="flex gap-3">
                <CheckCircleIcon className="h-6 w-6 shrink-0 text-secondary" />
                Wait for NACC approval and assigned payment reference.
              </li>
              <li className="flex gap-3">
                <CheckCircleIcon className="h-6 w-6 shrink-0 text-secondary" />
                Send payment using the approved method and include your reference.
              </li>
              <li className="flex gap-3">
                <CheckCircleIcon className="h-6 w-6 shrink-0 text-secondary" />
                NACC marks the payment as received and confirms your tournament spot.
              </li>
            </ol>
          </div>

          <div className="rounded-lg bg-primary p-7 text-white">
            <h2 className="text-2xl font-bold">Support community cricket</h2>
            <p className="mt-4 leading-7 text-white/80">
              Sponsors and donors help keep coaching, youth development, and community
              tournaments accessible. Contact NACC to discuss equipment support, ground
              partnerships, scholarship funds, or event sponsorship.
            </p>
            <Link to="/contact" className="btn btn-secondary mt-6">
              Contact NACC
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payments;
