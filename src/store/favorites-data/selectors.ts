import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getFavorites = (state: State) => state[NameSpace.Favorites].favorites;

export const getFetchingStatusFavorites = (state: State) => state[NameSpace.Favorites].fetchingStatusFavorites;
