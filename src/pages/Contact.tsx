import { type FormEvent, useState } from 'react';
import { submitContact } from '../services/nacc-service';

const topics = ['Tournament registration', 'Youth programs', 'Volunteer', 'Sponsorship', 'Ground partnership', 'General'];

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: topics[0],
    message: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      await submitContact(form);
      setStatus('success');
      setMessage('Message received. NACC will follow up soon.');
      setForm({ name: '', email: '', phone: '', topic: topics[0], message: '' });
    } catch (issue) {
      setStatus('error');
      setMessage(issue instanceof Error ? issue.message : 'Message could not be submitted.');
    }
  };

  return (
    <div className="bg-surface py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="section-title">Start a conversation with NACC.</h1>
            <p className="section-copy mt-5">
              Reach out about tournaments, coaching programs, sponsorships, volunteering,
              ground partnerships, or general community cricket questions.
            </p>

            <div className="panel mt-8 p-6">
              <h2 className="mb-4 text-xl font-bold">Primary contacts</h2>
              <div className="grid gap-4 text-sm text-on-surface-variant">
                <p><strong>Admin:</strong> admin@northamericacricketconference.org</p>
                <p><strong>Support:</strong> support@northamericacricketconference.org</p>
                <p><strong>Region:</strong> Serving cricket communities across the United States</p>
              </div>
            </div>
          </div>

          <form className="panel p-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="label">Name</span>
                <input
                  className="field"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span className="label">Email</span>
                <input
                  className="field"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  required
                />
              </label>
              <label>
                <span className="label">Phone</span>
                <input
                  className="field"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                />
              </label>
              <label>
                <span className="label">Topic</span>
                <select
                  className="field"
                  value={form.topic}
                  onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))}
                >
                  {topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="mt-5 block">
              <span className="label">Message</span>
              <textarea
                className="field min-h-40"
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                required
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

            <button className="btn btn-primary mt-6 w-full" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
