import { Catalog } from '../catalog';
import { AlbumsItem } from '../item';
import { AlbumsResponse } from '@schroedan/apple-music-api';

export class AlbumsCollection {
  constructor(readonly catalog: Catalog, private albums: AlbumsResponse) {}

  data(): AlbumsItem[] {
    return [...this.albums.data].map(
      (item) => new AlbumsItem(this.catalog, item)
    );
  }

  async next(): Promise<AlbumsCollection | undefined> {
    if (this.albums.next === undefined) {
      return;
    }

    const next = this.catalog.client.albums.url(this.albums.next);
    const term = next.searchParams.get('term');
    const limit = next.searchParams.get('limit');
    const offset = next.searchParams.get('offset');
    const _with = next.searchParams.get('with');

    if (term === null) {
      return;
    }

    return await this.catalog.searchAlbums(term, {
      l: next.searchParams.get('l') || undefined,
      limit: limit === null ? undefined : parseInt(limit),
      offset: offset === null ? undefined : parseInt(offset),
      _with: _with !== 'topResults' ? undefined : ['topResults'],
    });
  }
}
