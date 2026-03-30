import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, History, User, Settings } from 'lucide-react';

export function Layout() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 pb-16">
      <main className="container mx-auto px-4 py-6 max-w-md">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="container mx-auto max-w-md px-4 h-16 flex items-center justify-between">
          <NavLink 
            to="/matches" 
            className={({ isActive }) => `flex flex-col items-center gap-1 p-2 flex-1 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t('nav_matches')}</span>
          </NavLink>
          
          <NavLink 
            to="/history" 
            className={({ isActive }) => `flex flex-col items-center gap-1 p-2 flex-1 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <History className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t('nav_history')}</span>
          </NavLink>

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex flex-col items-center gap-1 p-2 flex-1 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t('nav_profile')}</span>
          </NavLink>

          <NavLink 
            to="/settings" 
            className={({ isActive }) => `flex flex-col items-center gap-1 p-2 flex-1 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t('nav_settings')}</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
