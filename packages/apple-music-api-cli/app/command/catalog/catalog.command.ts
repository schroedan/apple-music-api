import { Factory } from '../../factory';
import { CatalogAlbumsCommand, CatalogArtistsCommand } from '.';
import { Command } from 'commander';

export class CatalogCommand {
  readonly name = 'catalog';
  readonly description = 'execute operations in the Apple Music catalog';

  readonly command: Command;

  constructor(readonly program: Command, readonly factory: Factory) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.addCommand(
      new CatalogAlbumsCommand(this.program, this.factory).command
    );
    this.command.addCommand(
      new CatalogArtistsCommand(this.program, this.factory).command
    );
  }
}
