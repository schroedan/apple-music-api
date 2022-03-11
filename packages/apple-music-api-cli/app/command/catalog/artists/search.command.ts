import { Factory } from '../../../factory';
import { Utils } from '../../../utils';
import { Command } from 'commander';

export class CatalogArtistsSearchCommand {
  readonly name = 'search';
  readonly description = 'search for artists in the Apple Music catalog';

  readonly command: Command;

  constructor(readonly program: Command, readonly factory: Factory) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.argument(
      '<term>',
      'the entered text for the search with `+` characters between each word, to replace spaces (for example `term=james+br`).'
    );
    this.command.option(
      '--limit <number>',
      'the number of objects or number of objects in the specified relationship returned',
      parseInt,
      5
    );
    this.command.option(
      '--storefront <countryCode>',
      'an iTunes Store territory, specified by an ISO 3166 alpha-2 country code',
      'us'
    );
    this.command.action(this.execute.bind(this));
  }

  async execute(term: string, options: { limit: number; storefront: string }) {
    const catalog = this.factory.catalog(options.storefront);
    const collection = await catalog.searchArtists(term, {
      limit: options.limit,
    });

    if (collection === undefined) {
      console.error(`no artists named '${term}' found`);
      process.exit(1);
    }

    console.table(await Utils.mapArtistsCollection(collection), ['id', 'name']);
  }
}
