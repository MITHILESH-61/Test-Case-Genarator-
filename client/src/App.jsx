import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { useUiStore } from './store/uiStore.js';

export const App = () => {
  const darkMode = useUiStore((state) => state.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

