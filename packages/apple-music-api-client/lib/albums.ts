import { Client } from './client';
import { AlbumsApi, AlbumsApiApiKeys } from '@schroedan/apple-music-api';
import { URL } from 'url';

export class Albums {
  readonly api: AlbumsApi;

  constructor(readonly client: Client) {
    this.api = new AlbumsApi();
  }

  url(value: string): URL {
    return new URL(value, this.api.basePath);
  }

  withJWT(): Albums {
    this.api.setApiKey(AlbumsApiApiKeys.JWT, `Bearer ${this.client.token}`);
    return this;
  }

  withMusicUserToken(): Albums {
    this.api.setApiKey(AlbumsApiApiKeys.MusicUserToken, this.client.code);
    return this;
  }
}
