export const Settings = {
  offers: 300,
} as const;

export const enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/'
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
