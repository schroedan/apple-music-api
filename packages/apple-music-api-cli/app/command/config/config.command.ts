import { Config } from '../../config';
import { ConfigGetCommand } from '.';
import { Command } from 'commander';

export class ConfigCommand {
  readonly name = 'config';
  readonly description = 'manage config settings';

  readonly command: Command;

  constructor(readonly program: Command, readonly config: Config) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.addCommand(
      new ConfigGetCommand(this.program, this.config).command
    );
  }
}
