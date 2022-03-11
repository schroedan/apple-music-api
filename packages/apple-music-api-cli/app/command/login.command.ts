import { Config } from '../config';
import { Command } from 'commander';
import express from 'express';
import open from 'open';
import passport from 'passport';
import { Strategy } from 'passport-apple-music';

export class LoginCommand {
  readonly name = 'login';
  readonly description = 'log in to Apple Music';

  readonly command: Command;

  constructor(readonly program: Command, readonly config: Config) {
    this.command = this.program.createCommand(this.name);
    this.configure();
  }

  configure() {
    this.command.description(this.description);
    this.command.option(
      '-g, --global',
      'use global config',
      false
    );
    this.command.option(
      '-t, --team-id <id>',
      'ID of your developer team',
      this.config.loginTeam
    );
    this.command.option(
      '-k, --key-id <id>',
      'ID of your private key',
      this.config.loginKey
    );
    this.command.option(
      '-f, --key <file>',
      'path to your private key file',
      this.config.loginPrivateKey
    );
    this.command.option(
      '-p, --port <number>',
      'port where the server will listen for reqoests',
      parseInt,
      3000
    );
    this.command.option(
      '-h, --hostname <hostname>',
      'hostname where the server will listen for requests',
      'localhost'
    );
    this.command.action(this.execute.bind(this));
  }

  execute(options: {
    global: boolean;
    teamId?: string;
    keyId?: string;
    key?: string;
    port: number;
    hostname: string;
  }) {
    const teamID = options.teamId;
    const keyID = options.keyId;
    const privateKeyLocation = options.key;
    const callbackURL = `http://${options.hostname}:${options.port}/auth`;

    if (teamID === undefined) {
      console.error(`No team ID specified.`);
      process.exit(1);
    }

    if (keyID === undefined) {
      console.error(`No key ID specified.`);
      process.exit(1);
    }

    if (privateKeyLocation === undefined) {
      console.error(`No private key location specified.`);
      process.exit(1);
    }

    passport.use(this.strategy(teamID, keyID, privateKeyLocation, callbackURL));

    const app = express();

    app.use(passport.initialize());
    app.get('/', passport.authenticate('apple-music'));
    app.get('/auth', (req) =>
      this.handle(
        req.query['id_token_hint'] as string,
        req.query['code'] as string,
        options.global
      )
    );
    app.listen(options.port, options.hostname, () => this.listen(options));
  }

  strategy(
    teamID: string,
    keyID: string,
    privateKeyLocation: string,
    callbackURL: string
  ) {
    /* eslint @typescript-eslint/no-empty-function: "off" */
    return new Strategy(
      { teamID, keyID, privateKeyLocation, callbackURL },
      () => {}
    );
  }

  handle(token: string, code: string, global: boolean) {
    if (global) {
      this.config.global.authToken = token;
      this.config.global.authCode = code;
    } else {
      this.config.local.authToken = token;
      this.config.local.authCode = code;
    }

    console.info(`${this.config.env.prefix}_AUTH_TOKEN: ${token}`);
    console.info(`${this.config.env.prefix}_AUTH_CODE: ${code}`);
    process.exit();
  }

  listen(options: { port: number; hostname: string }) {
    const target = `http://${options.hostname}:${options.port}/`;

    console.info(
      `Please open ${target} in your favorite web browser and accept the request.`
    );
    console.info(`Press ctrl+c to cancel.`);
    open(target);
  }
}
