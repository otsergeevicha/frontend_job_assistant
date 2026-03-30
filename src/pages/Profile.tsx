import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockApi, type ProfileData } from '../api/mockApi';

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    role: '',
    stack: '',
    level: 'Junior',
    salary: '',
    location: ''
  });

  useEffect(() => {
    mockApi.getProfile().then(data => {
      setProfile(data);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await mockApi.updateProfile(profile);
    setIsSaving(false);
    navigate('/sources');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold">{t('profile_title')}</h1>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">{t('profile_role')}</span>
          <input 
            type="text" 
            value={profile.role}
            onChange={e => setProfile({ ...profile, role: e.target.value })}
            placeholder="Frontend Developer"
            className="p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">{t('profile_stack')}</span>
          <input 
            type="text" 
            value={profile.stack}
            onChange={e => setProfile({ ...profile, stack: e.target.value })}
            placeholder="React, TypeScript, Tailwind"
            className="p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">{t('profile_level')}</span>
          <select 
            value={profile.level}
            onChange={e => setProfile({ ...profile, level: e.target.value })}
            className="p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option>Junior</option>
            <option>Middle</option>
            <option>Senior</option>
            <option>Lead</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">{t('profile_salary')}</span>
          <input 
            type="text" 
            value={profile.salary}
            onChange={e => setProfile({ ...profile, salary: e.target.value })}
            placeholder="$3000"
            className="p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">{t('profile_location')}</span>
          <input 
            type="text" 
            value={profile.location}
            onChange={e => setProfile({ ...profile, location: e.target.value })}
            placeholder="Remote / Relocation"
            className="p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </label>

        <div className="mt-2">
          <button className="w-full py-4 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-muted-foreground hover:bg-muted/50 transition-colors">
            <Upload className="w-5 h-5" />
            <span>{t('profile_cv')}</span>
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity active:scale-95 mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSaving && <Loader2 className="w-5 h-5 animate-spin" />}
        {t('save_btn')}
      </button>
    </div>
  );
}
