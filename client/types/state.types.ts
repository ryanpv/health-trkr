export type Quest = {
  date: string,
  id: number,
  quest_status: string,
  quest_type: string,
  title: string
};

export type Reward = {
  date?: string,
  id: number,
  title: string,
  points_cost:  number,
};

export type User = {
  email: string,
  displayName: string,
  totalPoints: number;
  dailyStreak: number;
  weeklyStreak: number;
  lastDailyBonus: string | null; 
};
