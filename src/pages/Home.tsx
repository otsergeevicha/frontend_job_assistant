import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Briefcase className="w-10 h-10 text-primary" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{t('welcome_title')}</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-sm">
        {t('welcome_subtitle')}
      </p>

      <button
        onClick={() => navigate('/profile')}
        className="w-full max-w-xs bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity active:scale-95"
      >
        {t('start_btn')}
      </button>
    </div>
  );
}
