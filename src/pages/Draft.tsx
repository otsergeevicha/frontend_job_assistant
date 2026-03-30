import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Send, ArrowLeft, Bot, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockApi } from '../api/mockApi';

export function Draft() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [draftText, setDraftText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (id) {
      mockApi.getDraft(id).then(data => {
        setDraftText(data.draftText);
        setIsLoading(false);
      });
    }
  }, [id]);

  const handleSend = async () => {
    if (!id) return;
    setIsSending(true);
    await mockApi.sendApplication(id, draftText);
    setIsSending(false);
    navigate('/history');
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
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('draft_title')}</h1>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 items-start">
        <div className="bg-primary/20 p-2 rounded-full shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {t('draft_subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">Cover Letter Draft</label>
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          className="w-full h-64 p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none leading-relaxed"
        />
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={handleSend}
          disabled={isSending}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          <span>{t('send_btn')}</span>
        </button>
        
        <button
          onClick={() => navigate(-1)}
          disabled={isSending}
          className="w-full bg-muted text-muted-foreground py-4 rounded-xl font-semibold text-lg hover:bg-muted/80 transition-colors active:scale-95 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
