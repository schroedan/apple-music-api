import { Client } from './client';
import { SearchApi, SearchApiApiKeys } from '@schroedan/apple-music-api';
import { URL } from 'url';

export class Search {
  readonly api: SearchApi;

  constructor(readonly client: Client) {
    this.api = new SearchApi();
  }

  url(value: string): URL {
    return new URL(value, this.api.basePath);
  }

  withJWT(): Search {
    this.api.setApiKey(SearchApiApiKeys.JWT, `Bearer ${this.client.token}`);
    return this;
  }

  withMusicUserToken(): Search {
    this.api.setApiKey(SearchApiApiKeys.MusicUserToken, this.client.code);
    return this;
  }
}
