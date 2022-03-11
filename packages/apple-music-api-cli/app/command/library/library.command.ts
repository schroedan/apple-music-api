import { Factory } from '../../factory';
import { Command } from 'commander';

export class LibraryCommand {
  readonly name = 'library';
  readonly description = 'execute operations in the Apple Music library';

  readonly command: Command;

  constructor(readonly program: Command, readonly factory: Factory) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
  }
}
