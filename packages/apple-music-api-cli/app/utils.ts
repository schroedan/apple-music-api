import {
  AlbumsCollection,
  ArtistsCollection,
} from '@schroedan/apple-music-api-client';
import { map } from 'async';

export class Utils {
  static async mapAlbumsCollection(collection: AlbumsCollection) {
    return await map(collection.data(), (albums, callback) =>
      albums
        .attributes()
        .then((attributes) =>
          callback(null, Object.assign({ id: albums.id }, attributes))
        )
        .catch((err) => callback(err))
    );
  }

  static async mapArtistsCollection(collection: ArtistsCollection) {
    return await map(collection.data(), (artists, callback) =>
      artists
        .attributes()
        .then((attributes) =>
          callback(null, Object.assign({ id: artists.id }, attributes))
        )
        .catch((err) => callback(err))
    );
  }
}
