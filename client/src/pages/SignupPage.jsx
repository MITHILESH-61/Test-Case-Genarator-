import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout.jsx';
import { Button } from '../components/common/Button.jsx';
import { Input } from '../components/common/Input.jsx';
import { useAuthStore } from '../store/authStore.js';

export const SignupPage = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(form);
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start generating project-aware test suites.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" value={form.name} onChange={updateField('name')} required />
        <Input label="Email" type="email" value={form.email} onChange={updateField('email')} required />
        <Input label="Password" type="password" value={form.password} onChange={updateField('password')} minLength={8} required />
        {error ? <p className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          <UserPlus size={16} />
          Sign Up
        </Button>
      </form>
      <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

