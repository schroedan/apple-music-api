import { Factory } from '../../../factory';
import {
  CatalogArtistsGetCommand,
  CatalogArtistsSearchCommand,
} from '.';
import { Command } from 'commander';

export class CatalogArtistsCommand {
  readonly name = 'artists';
  readonly description =
    'Execute operations on artists in the Apple Music catalog';

  readonly command: Command;

  constructor(readonly program: Command, readonly factory: Factory) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.addCommand(
      new CatalogArtistsGetCommand(this.program, this.factory).command
    );
    this.command.addCommand(
      new CatalogArtistsSearchCommand(this.program, this.factory).command
    );
  }
}
