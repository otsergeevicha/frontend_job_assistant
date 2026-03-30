import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeProvider';
import { Moon, Sun, Palette, Globe, Clock, CreditCard, Bell, Loader2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockApi, type SettingsData } from '../api/mockApi';

export function Settings() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    mockApi.getSettings().then(data => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    await mockApi.updateSettings(settings);
    setIsSaving(false);
  };

  const toggleDay = (day: string) => {
    if (!settings) return;
    setSettings(prev => {
      if (!prev) return prev;
      const days = prev.schedule.days.includes(day)
        ? prev.schedule.days.filter(d => d !== day)
        : [...prev.schedule.days, day];
      return { ...prev, schedule: { ...prev.schedule, days } };
    });
  };

  if (isLoading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
        <p>{t('loading')}</p>
      </div>
    );
  }

  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  return (
    <div className="flex flex-col gap-8 pb-8">
      <h1 className="text-2xl font-bold">{t('settings_title')}</h1>

      {/* Subscription Section */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-primary">
          <CreditCard className="w-6 h-6" />
          <h2 className="text-lg font-bold">{t('subscription_plan')}</h2>
        </div>
        <p className="text-sm text-foreground/80">
          You are currently on the <span className="capitalize font-semibold">{settings.plan}</span> plan. Upgrade to Pro to get 5 highly relevant matches daily and AI-powered cover letters.
        </p>
        <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity active:scale-95 mt-2">
          {t('upgrade_btn')}
        </button>
      </section>

      {/* Schedule Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Clock className="w-5 h-5" />
          <h2>{t('schedule_title')}</h2>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t('schedule_time')}</span>
            <select 
              value={settings.schedule.time}
              onChange={(e) => setSettings({ ...settings, schedule: { ...settings.schedule, time: e.target.value } })}
              className="bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="18:00 PM">18:00 PM</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <span className="text-muted-foreground text-sm">Delivery Days</span>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.schedule.days.includes(day)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {t(`day_${day}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
          <span className="text-muted-foreground">Daily Limit</span>
          <span className="font-semibold">{settings.schedule.limit} Jobs (Free)</span>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Bell className="w-5 h-5" />
          <h2>Preferences</h2>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">{t('language')}</span>
          </div>
          <button 
            onClick={toggleLanguage}
            className="bg-muted px-4 py-2 rounded-lg font-medium uppercase hover:bg-muted/80 transition-colors"
          >
            {i18n.language}
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-4">
          <span className="text-muted-foreground">App Theme</span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setTheme('light')} 
              className={`flex-1 flex justify-center p-3 rounded-xl transition-colors ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              <Sun className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setTheme('dark')} 
              className={`flex-1 flex justify-center p-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              <Moon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setTheme('theme-carrot')} 
              className={`flex-1 flex justify-center p-3 rounded-xl transition-colors text-orange-500 ${theme === 'theme-carrot' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              <Palette className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setTheme('theme-purple')} 
              className={`flex-1 flex justify-center p-3 rounded-xl transition-colors text-purple-500 ${theme === 'theme-purple' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              <Palette className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setTheme('theme-mint')} 
              className={`flex-1 flex justify-center p-3 rounded-xl transition-colors text-green-500 ${theme === 'theme-mint' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
            >
              <Palette className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
      >
        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
        <span>Save Settings</span>
      </button>
    </div>
  );
}
