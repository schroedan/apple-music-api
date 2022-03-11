import { Catalog } from '../catalog';
import { AlbumsCollection } from '../collection';
import { Artists, ArtistsAttributes } from '@schroedan/apple-music-api';

export class ArtistsItem {
  constructor(readonly catalog: Catalog, private artists: Artists) {}

  get id(): string {
    return this.artists.id;
  }

  private async refresh(): Promise<void> {
    const artist = await this.catalog.getArtist(this.id);

    if (artist === undefined || artist.artists === undefined) {
      return;
    }

    this.artists = artist.artists;
  }

  async albums(): Promise<AlbumsCollection | undefined> {
    if (this.artists.relationships === undefined) {
      this.refresh();
    }

    if (this.artists.relationships?.albums === undefined) {
      return;
    }

    return new AlbumsCollection(
      this.catalog,
      this.artists.relationships.albums
    );
  }

  async attributes(): Promise<ArtistsAttributes | undefined> {
    if (this.artists.attributes === undefined) {
      await this.refresh();
    }

    return this.artists.attributes;
  }
}
