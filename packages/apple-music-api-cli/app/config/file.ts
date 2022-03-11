import fs from 'fs';

export class File {
  readonly path: string;

  constructor(dir: string, base = '.amrc') {
    this.path = `${dir}/${base}`;
  }

  get config() {
    if (!fs.existsSync(this.path)) {
      return;
    }

    return JSON.parse(fs.readFileSync(this.path, 'utf8'));
  }

  set config(config) {
    fs.writeFileSync(this.path, JSON.stringify(config, undefined, 2));
  }

  get authCode(): string | undefined {
    return this.config['authCode'];
  }

  set authCode(authCode: string | undefined) {
    this.config = Object.assign(this.config, { authCode });
  }

  get authToken(): string | undefined {
    return this.config['authToken'];
  }

  set authToken(authToken: string | undefined) {
    this.config = Object.assign(this.config, { authToken });
  }

  get loginKey(): string | undefined {
    return this.config['loginKey'];
  }

  set loginKey(loginKey: string | undefined) {
    this.config = Object.assign(this.config, { loginKey });
  }

  get loginPrivateKey(): string | undefined {
    return this.config['loginPrivateKey'];
  }

  set loginPrivateKey(loginPrivateKey: string | undefined) {
    this.config = Object.assign(this.config, { loginPrivateKey });
  }

  get loginTeam(): string | undefined {
    return this.config['loginTeam'];
  }

  set loginTeam(loginTeam: string | undefined) {
    this.config = Object.assign(this.config, { loginTeam });
  }
}
