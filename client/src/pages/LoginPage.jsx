import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout.jsx';
import { Button } from '../components/common/Button.jsx';
import { Input } from '../components/common/Input.jsx';
import { useAuthStore } from '../store/authStore.js';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const [form, setForm] = useState({ email: '', password: '' });

  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(form);
    navigate(location.state?.from?.pathname || '/dashboard');
  };

  return (
    <AuthLayout title="Login" subtitle="Continue to your project workspaces.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" value={form.email} onChange={updateField('email')} required />
        <Input label="Password" type="password" value={form.password} onChange={updateField('password')} required />
        {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          <LogIn size={16} />
          Login
        </Button>
      </form>
      <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
        New here?{' '}
        <Link to="/signup" className="font-semibold text-brand">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

