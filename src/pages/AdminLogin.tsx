import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAdmin } from '../services/nacc-service';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signInAdmin(email, password);
      navigate('/admin');
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-container-low py-20">
      <div className="container">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <p className="eyebrow mb-3">Admin</p>
            <h1 className="text-3xl font-black">NACC operations login</h1>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              Use your Supabase admin account to manage NACC operations.
            </p>
          </div>

          <form className="panel p-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="label">Email</span>
              <input
                className="field"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="mt-5 block">
              <span className="label">Password</span>
              <input
                className="field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            {error && <div className="mt-5 rounded-md bg-secondary p-4 text-sm text-white">{error}</div>}

            <button className="btn btn-primary mt-6 w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
