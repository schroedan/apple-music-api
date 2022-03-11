import { Catalog } from '../catalog';
import { ArtistsItem } from '../item';
import { ArtistsResponse } from '@schroedan/apple-music-api';

export class ArtistsCollection {
  constructor(readonly catalog: Catalog, private artists: ArtistsResponse) {}

  data(): ArtistsItem[] {
    return [...this.artists.data].map(
      (item) => new ArtistsItem(this.catalog, item)
    );
  }

  async next(): Promise<ArtistsCollection | undefined> {
    if (this.artists.next === undefined) {
      return;
    }

    const next = this.catalog.client.albums.url(this.artists.next);
    const term = next.searchParams.get('term');
    const limit = next.searchParams.get('limit');
    const offset = next.searchParams.get('offset');
    const _with = next.searchParams.get('with');

    if (term === null) {
      return;
    }

    return await this.catalog.searchArtists(term, {
      l: next.searchParams.get('l') || undefined,
      limit: limit === null ? undefined : parseInt(limit),
      offset: offset === null ? undefined : parseInt(offset),
      _with: _with !== 'topResults' ? undefined : ['topResults'],
    });
  }
}
