
import { Offer } from './types/offer';

export function getCity (list: Offer[]) {
  const cityFromList = list.map((item) => item.city)[0];

  return cityFromList;
}
