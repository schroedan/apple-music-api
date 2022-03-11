import { Client } from './client';
import { ArtistsApi, ArtistsApiApiKeys } from '@schroedan/apple-music-api';
import { URL } from 'url';

export class Artists {
  readonly api: ArtistsApi;

  constructor(readonly client: Client) {
    this.api = new ArtistsApi();
  }

  url(value: string): URL {
    return new URL(value, this.api.basePath);
  }

  withJWT(): Artists {
    this.api.setApiKey(ArtistsApiApiKeys.JWT, `Bearer ${this.client.token}`);
    return this;
  }

  withMusicUserToken(): Artists {
    this.api.setApiKey(ArtistsApiApiKeys.MusicUserToken, this.client.code);
    return this;
  }
}
