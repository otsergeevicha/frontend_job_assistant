// Mock API service to simulate backend responses
// Replace these with actual API calls using apiClient when backend is ready

export interface ProfileData {
  role: string;
  stack: string;
  level: string;
  salary: string;
  location: string;
  cvUrl?: string;
}

export interface SourceData {
  id: string;
  name: string;
  selected: boolean;
}

export interface MatchData {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  score: number;
  reason: string;
  tags: string[];
}

export interface MatchesResponse {
  limit: number;
  total: number;
  matches: MatchData[];
}

export interface DraftData {
  matchId: string;
  draftText: string;
}

export interface HistoryData {
  id: string;
  company: string;
  position: string;
  date: string;
  status: 'sent' | 'viewed' | 'rejected' | 'pending';
  platform: string;
}

export interface SettingsData {
  plan: 'free' | 'pro';
  schedule: {
    time: string;
    days: string[];
    limit: number;
  };
  preferences: {
    language: string;
    theme: string;
  };
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getProfile: async (): Promise<ProfileData> => {
    await delay(800);
    return {
      role: 'Frontend Developer',
      stack: 'React, TypeScript, Tailwind',
      level: 'Senior',
      salary: '$5000',
      location: 'Remote',
    };
  },

  updateProfile: async (data: ProfileData): Promise<ProfileData> => {
    await delay(800);
    return data;
  },

  getSources: async (): Promise<SourceData[]> => {
    await delay(600);
    return [
      { id: 'hh', name: 'HeadHunter', selected: true },
      { id: 'linkedin', name: 'LinkedIn', selected: true },
      { id: 'tg_jobs', name: 'Telegram Jobs', selected: false },
      { id: 'habr', name: 'Habr Career', selected: true },
      { id: 'remoteok', name: 'RemoteOK', selected: false },
    ];
  },

  updateSources: async (data: SourceData[]): Promise<SourceData[]> => {
    await delay(600);
    return data;
  },

  getMatches: async (): Promise<MatchesResponse> => {
    await delay(1000);
    return {
      limit: 3,
      total: 3,
      matches: [
        {
          id: '1',
          title: 'Senior Frontend Developer (React)',
          company: 'TechCorp Inc.',
          location: 'Remote (Worldwide)',
          salary: '$5,000 - $7,000',
          score: 95,
          reason: 'Matches your React and TypeScript stack perfectly. Salary expectations align.',
          tags: ['React', 'TypeScript', 'Tailwind']
        },
        {
          id: '2',
          title: 'Frontend Engineer',
          company: 'FinTech Startup',
          location: 'London / Remote',
          salary: '$4,500 - $6,000',
          score: 88,
          reason: 'Strong match for your level and tech stack. Location is flexible.',
          tags: ['React', 'Next.js', 'GraphQL']
        },
        {
          id: '3',
          title: 'Web Developer',
          company: 'Digital Agency',
          location: 'Remote (Europe)',
          salary: '€4,000 - €5,500',
          score: 82,
          reason: 'Good match for your skills, but slightly lower salary range.',
          tags: ['Vue', 'JavaScript', 'CSS']
        }
      ]
    };
  },

  getDraft: async (matchId: string): Promise<DraftData> => {
    await delay(1200);
    return {
      matchId,
      draftText: `Hi! I'm a Senior Frontend Developer with strong experience in React and TypeScript. I saw your opening for the position and I believe my background aligns perfectly with your requirements.\n\nI've spent the last 4 years building scalable web applications and I'm very comfortable with Tailwind CSS and modern frontend tooling.\n\nI'd love to discuss how I can contribute to your team. My CV is attached.\n\nBest regards,\n[Your Name]`
    };
  },

  sendApplication: async (matchId: string, draftText: string): Promise<{ success: boolean }> => {
    await delay(1000);
    return { success: true };
  },

  getHistory: async (): Promise<HistoryData[]> => {
    await delay(800);
    return [
      {
        id: '1',
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        date: 'Today, 10:30 AM',
        status: 'sent',
        platform: 'LinkedIn'
      },
      {
        id: '2',
        company: 'FinTech Startup',
        position: 'Frontend Engineer',
        date: 'Yesterday, 14:15 PM',
        status: 'viewed',
        platform: 'Telegram'
      },
      {
        id: '3',
        company: 'Digital Agency',
        position: 'Web Developer',
        date: 'Mar 28, 09:00 AM',
        status: 'rejected',
        platform: 'Email'
      }
    ];
  },

  getSettings: async (): Promise<SettingsData> => {
    await delay(600);
    return {
      plan: 'free',
      schedule: {
        time: '09:00 AM',
        days: ['mon', 'tue', 'wed', 'thu', 'fri'],
        limit: 3
      },
      preferences: {
        language: 'ru',
        theme: 'light'
      }
    };
  },

  updateSettings: async (data: SettingsData): Promise<SettingsData> => {
    await delay(600);
    return data;
  }
};
