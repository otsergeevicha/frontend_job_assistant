import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockApi, type HistoryData } from '../api/mockApi';

export function History() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockApi.getHistory().then(data => {
      setHistory(data);
      setIsLoading(false);
    });
  }, []);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'sent': return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case 'viewed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'sent': return 'Sent';
      case 'viewed': return 'Viewed';
      case 'rejected': return 'Rejected';
      default: return 'Pending';
    }
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
      <h1 className="text-2xl font-bold">{t('history_title')}</h1>

      {history.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          {t('history_empty')}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map(item => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex justify-between items-center gap-4 shadow-sm">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-base leading-tight">{item.position}</h3>
                <p className="text-muted-foreground text-sm">{item.company}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {item.platform}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
                  {getStatusIcon(item.status)}
                  <span className="text-xs font-medium capitalize">{getStatusText(item.status)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
