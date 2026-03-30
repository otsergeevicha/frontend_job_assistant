import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, Briefcase, MapPin, DollarSign, Loader2 } from 'lucide-react';
import { mockApi, type MatchesResponse } from '../api/mockApi';

export function Matches() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<MatchesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockApi.getMatches().then(res => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('matches_title')}</h1>
        {data && (
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
            {data.matches.length} / {data.limit}
          </span>
        )}
      </div>

      {!data?.matches.length ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          {t('matches_empty')}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.matches.map(match => (
            <div key={match.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold text-lg leading-tight">{match.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{match.company}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1 bg-green-500/10 text-green-600 px-2 py-1 rounded-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">{match.score}%</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{match.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  <span>{match.salary}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {match.tags.map(tag => (
                  <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <span className="font-semibold text-primary mr-1">AI Match:</span>
                  {match.reason}
                </p>
              </div>

              <button
                onClick={() => navigate(`/draft/${match.id}`)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity active:scale-95 mt-2"
              >
                {t('apply_btn')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
