export type BadgeTier = "bronze" | "silver" | "gold";

export type Badge = {
  id: string;
  title: string;
  description: string;
  tier: BadgeTier;
};
