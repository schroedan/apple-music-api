import { Client } from './client';
import { AlbumsApi } from '@schroedan/apple-music-api';

export class Library {
  private albumsApi: AlbumsApi;

  constructor(readonly client: Client) {
    this.albumsApi = this.client.albums.withJWT().withMusicUserToken().api;
  }

  async addAlbums(ids: string[]) {
    await this.albumsApi.addToLibrary(ids);
  }
}
