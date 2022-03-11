import { Config } from './config';
import { Catalog, Client } from '@schroedan/apple-music-api-client';

export class Factory {
  constructor(readonly config: Config) {}

  client() {
    if (
      this.config.authToken === undefined ||
      this.config.authCode === undefined
    ) {
      console.error('invalid auth config, please login');
      process.exit(1);
    }

    return new Client(this.config.authToken, this.config.authCode);
  }

  catalog(storefront: string) {
    return new Catalog(this.client(), storefront);
  }
}
