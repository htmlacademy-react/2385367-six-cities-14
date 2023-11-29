import { City } from '../types/offer';

export const getRandomCity = (obj: Record<string, City>) => {
  const keys = Object.keys(obj);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return obj[randomKey];
};

