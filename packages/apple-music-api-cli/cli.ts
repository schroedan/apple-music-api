import {
  CatalogCommand,
  ConfigCommand,
  Config,
  Factory,
  LibraryCommand,
  LoginCommand,
} from './app';
import { Command } from 'commander';

/* eslint @typescript-eslint/no-var-requires: "off" */
const pkg = require('./package.json');

const config = new Config();
const factory = new Factory(config);
const program = new Command();

program
  .version(pkg.version)
  .description(pkg.description)
  .addCommand(new CatalogCommand(program, factory).command)
  .addCommand(new ConfigCommand(program, config).command)
  .addCommand(new LibraryCommand(program, factory).command)
  .addCommand(new LoginCommand(program, config).command)
  .parse(process.argv);
