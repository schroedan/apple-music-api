import { Config } from '../../config';
import { Command } from 'commander';

export class ConfigGetCommand {
  readonly name = 'get';
  readonly description = 'get config settings';

  readonly command: Command;

  constructor(readonly program: Command, readonly config: Config) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.argument('<key>', 'the config key');
    this.command.action(this.execute.bind(this));
  }

  async execute(key: keyof Config) {
    console.log(this.config[key]);
  }
}
