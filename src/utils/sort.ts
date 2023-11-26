
import { Offers } from '../types/offer';

export const sorting: Record<string, (offers: Offers[]) => Offers[]> = {
  popular: (offers: Offers[]) => offers.slice(),
  high: (offers: Offers[]) => offers.slice().sort((a: Offers, b: Offers) => a.price - b.price),
  low: (offers: Offers[]) => offers.slice().sort((a: Offers, b: Offers) => b.price - a.price),
  top: (offers: Offers[]) => offers.slice().sort((a: Offers, b: Offers) => b.rating - a.rating),
};
