import { Factory } from '../../../factory';
import { Utils } from '../../../utils';
import { Command } from 'commander';

export class CatalogArtistsGetCommand {
  readonly name = 'get';
  readonly description =
    "fetch an artist from the Apple Music catalog by using the artist's identifier";

  readonly command: Command;

  constructor(readonly program: Command, readonly factory: Factory) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.argument('<id>', 'the unique identifier for the artist');
    this.command.option('--albums', 'fetch all albums of the artist', false);
    this.command.option(
      '--storefront <countryCode>',
      'an iTunes Store territory, specified by an ISO 3166 alpha-2 country code',
      'us'
    );
    this.command.action(this.execute.bind(this));
  }

  async execute(id: string, options: { albums: boolean; storefront: string }) {
    const catalog = this.factory.catalog(options.storefront);
    const artist = await catalog.getArtist(id);

    if (artist === undefined) {
      console.error(`no artists with ID '${id}' found`);
      process.exit(1);
    }

    if (!options.albums) {
      console.table(
        [Object.assign({ id: artist.id }, await artist.attributes())],
        ['id', 'name']
      );
      process.exit(0);
    }

    const collection = await artist.albums();

    if (collection === undefined) {
      console.error(`no related albums found for artist with ID '${id}'`);
      process.exit(1);
    }

    console.table(await Utils.mapAlbumsCollection(collection), [
      'id',
      'artistName',
      'name',
      'releaseDate',
      'isCompilation',
      'isSingle',
    ]);
  }
}
