export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type ReviewData = {
  comment: Review['comment'];
  rating: Review['rating'];
}
