export class Env {
  constructor(readonly prefix = 'APPLE_MUSIC') {}

  get authCode(): string | undefined {
    return process.env[`${this.prefix}_AUTH_CODE`];
  }

  get authToken(): string | undefined {
    return process.env[`${this.prefix}_AUTH_TOKEN`];
  }

  get loginKey(): string | undefined {
    return process.env[`${this.prefix}_LOGIN_KEY`];
  }

  get loginPrivateKey(): string | undefined {
    return process.env[`${this.prefix}_LOGIN_PRIVATE_KEY`];
  }

  get loginTeam(): string | undefined {
    return process.env[`${this.prefix}_LOGIN_TEAM`];
  }
}
