import { Factory } from '../../../factory';
import { CatalogAlbumsSearchCommand } from '.';
import { Command } from 'commander';

export class CatalogAlbumsCommand {
  readonly name = 'albums';
  readonly description =
    'execute operations on albums in the Apple Music catalog';

  readonly command: Command;

  constructor(readonly program: Command, readonly factory: Factory) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.addCommand(
      new CatalogAlbumsSearchCommand(this.program, this.factory).command
    );
  }
}
