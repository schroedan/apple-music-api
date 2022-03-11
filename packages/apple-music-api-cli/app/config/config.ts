import { Env, File } from '.';
import os from 'os';

export class Config {
  readonly env: Env;
  readonly global: File;
  readonly local: File;

  constructor(options?: {
    prefix: string;
    home: string;
    cwd: string;
    base: string;
  }) {
    this.env = new Env(options?.prefix);
    this.global = new File(options?.home || os.homedir(), options?.base);
    this.local = new File(options?.cwd || process.cwd(), options?.base);
  }

  get authCode(): string | undefined {
    return this.env.authCode || this.local.authCode || this.global.authCode;
  }

  get authToken(): string | undefined {
    return this.env.authToken || this.local.authToken || this.global.authToken;
  }

  get loginKey(): string | undefined {
    return this.env.loginKey || this.local.loginKey || this.global.loginKey;
  }

  get loginPrivateKey(): string | undefined {
    return (
      this.env.loginPrivateKey ||
      this.local.loginPrivateKey ||
      this.global.loginPrivateKey
    );
  }

  get loginTeam(): string | undefined {
    return this.env.loginTeam || this.local.loginTeam || this.global.loginTeam;
  }
}
