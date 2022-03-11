import { Catalog } from '../catalog';
import { Albums, AlbumsAttributes } from '@schroedan/apple-music-api';

export class AlbumsItem {
  constructor(readonly catalog: Catalog, private albums: Albums) {}

  get id(): string {
    return this.albums.id;
  }

  private async refresh(): Promise<void> {
    const album = await this.catalog.getAlbum(this.id);

    if (album === undefined || album.albums === undefined) {
      return;
    }

    this.albums = album.albums;
  }

  async attributes(): Promise<AlbumsAttributes | undefined> {
    if (this.albums.attributes === undefined) {
      await this.refresh();
    }

    return this.albums.attributes;
  }
}
