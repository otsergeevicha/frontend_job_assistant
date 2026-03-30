import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { mockApi, type SourceData } from '../api/mockApi';

export function Sources() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sources, setSources] = useState<SourceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    mockApi.getSources().then(data => {
      setSources(data);
      setIsLoading(false);
    });
  }, []);

  const toggleSource = (id: string) => {
    setSources(sources.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await mockApi.updateSources(sources);
    setIsSaving(false);
    navigate('/matches');
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
      <div>
        <h1 className="text-2xl font-bold">{t('sources_title')}</h1>
        <p className="text-muted-foreground mt-2">{t('sources_subtitle')}</p>
      </div>

      <div className="flex flex-col gap-3">
        {sources.map(source => (
          <button
            key={source.id}
            onClick={() => toggleSource(source.id)}
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-95 ${
              source.selected 
                ? 'border-primary bg-primary/5' 
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <span className="font-medium">{source.name}</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              source.selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {source.selected && <Check className="w-4 h-4" />}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity active:scale-95 mt-8 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSaving && <Loader2 className="w-5 h-5 animate-spin" />}
        {t('save_btn')}
      </button>
    </div>
  );
}
