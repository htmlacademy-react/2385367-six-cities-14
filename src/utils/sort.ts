
import { Offer } from '../types/offer';

export const sorting: Record<string, (offers: Offer[]) => Offer[]> = {
  popular: (offers: Offer[]) => offers.slice(),
  high: (offers: Offer[]) => offers.slice().sort((a: Offer, b: Offer) => a.price - b.price),
  low: (offers: Offer[]) => offers.slice().sort((a: Offer, b: Offer) => b.price - a.price),
  top: (offers: Offer[]) => offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating),
};
