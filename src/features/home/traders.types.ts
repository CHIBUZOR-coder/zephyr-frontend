// data/traders.ts
// traders.ts
export type Risk = 'LOW' | 'MODERATE' | 'HIGH'
export interface Trader {
  id: number;
  name: string;
  memberSince: number;
  roi7d: number;
  winRate: number;
  risk: Risk;
  aum: string;
}