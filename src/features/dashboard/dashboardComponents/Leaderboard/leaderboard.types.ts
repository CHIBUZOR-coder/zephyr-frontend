export type LeaderboardUser = {
  id: string;
  username: string;
  walletAddress: string;
  rank: number;
  score: number;
  avatarUrl?: string; // optional avatar for user
};
