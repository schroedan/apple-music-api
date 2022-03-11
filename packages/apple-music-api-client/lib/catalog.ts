import { Client } from './client';
import { AlbumsCollection, ArtistsCollection } from './collection';
import { AlbumsItem, ArtistsItem } from './item';
import { AlbumsApi, ArtistsApi, SearchApi } from '@schroedan/apple-music-api';

export class Catalog {
  private albumsApi: AlbumsApi;
  private artistsApi: ArtistsApi;
  private searchApi: SearchApi;

  constructor(readonly client: Client, readonly storefront: string) {
    this.albumsApi = this.client.albums.withJWT().api;
    this.artistsApi = this.client.artists.withJWT().api;
    this.searchApi = this.client.search.withJWT().api;
  }

  async getAlbum(id: string): Promise<AlbumsItem | undefined> {
    const { body } = await this.albumsApi.getAlbumFromCatalog(
      this.storefront,
      id
    );

    if (body.data.size < 1) {
      return undefined;
    }

    const [albums] = body.data;

    return new AlbumsItem(this, albums);
  }

  async getArtist(id: string): Promise<ArtistsItem | undefined> {
    const { body } = await this.artistsApi.getArtistFromCatalog(
      this.storefront,
      id
    );

    if (body.data.size < 1) {
      return undefined;
    }

    const [artists] = body.data;

    return new ArtistsItem(this, artists);
  }

  async getArtistAlbums(id: string): Promise<AlbumsCollection | undefined> {
    const { body } = await this.artistsApi.getArtistFromCatalog(
      this.storefront,
      id
    );

    if (body.data.size < 1) {
      return undefined;
    }

    const [artists] = body.data;
    const item = new ArtistsItem(this, artists);

    return await item.albums();
  }

  async searchArtists(
    term: string,
    options: {
      l?: string;
      limit?: number;
      offset?: number;
      _with?: ['topResults'];
    } = {}
  ): Promise<ArtistsCollection | undefined> {
    const { l, limit, offset, _with } = options;
    const { body } = await this.searchApi.getSearchResponseFromCatalog(
      this.storefront,
      term,
      l,
      limit,
      offset === undefined ? undefined : '' + offset,
      ['artists'],
      _with
    );

    if (body.results.artists === undefined) {
      return undefined;
    }

    return new ArtistsCollection(this, body.results.artists);
  }

  async searchAlbums(
    term: string,
    options: {
      l?: string;
      limit?: number;
      offset?: number;
      _with?: ['topResults'];
    } = {}
  ): Promise<AlbumsCollection | undefined> {
    const { l, limit, offset, _with } = options;
    const { body } = await this.searchApi.getSearchResponseFromCatalog(
      this.storefront,
      term,
      l,
      limit,
      offset === undefined ? undefined : '' + offset,
      ['albums'],
      _with
    );

    if (body.results.albums === undefined) {
      return undefined;
    }

    return new AlbumsCollection(this, body.results.albums);
  }
}
