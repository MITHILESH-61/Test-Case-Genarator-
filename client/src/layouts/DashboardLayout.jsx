import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '../components/common/Button.jsx';
import { useAuthStore } from '../store/authStore.js';
import { useUiStore } from '../store/uiStore.js';

export const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const darkMode = useUiStore((state) => state.darkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="page-shell">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="font-bold text-slate-950 dark:text-white">
              Test Case Generator
            </Link>
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-semibold ${isActive ? 'bg-slate-100 text-brand dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300'}`
                }
              >
                Dashboard
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-slate-600 dark:text-slate-400 sm:inline">{user?.name}</span>
            <Button variant="ghost" onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
};

