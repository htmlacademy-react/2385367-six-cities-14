export type Offers = {
  id: string;
  city: City;
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  previewImage?: string;
  price: number;
  rating: number;
  title: string;
  type: string;
  }

export type City = {
    location: Location;
    name: string;
    };

type Location = {
      latitude: number;
      longitude: number;
      zoom: number;
      };

type OfferDuplicate = Omit <Offers, 'previewImage'>;

export type Host = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type Offer = OfferDuplicate & {
        bedrooms: number;
        description: string;
        goods: string[];
        host: Host;
        images: string[];
        maxAdults: number;
        };
