import { Config } from './config';
import * as os from 'os';

describe('Config', () => {
  it('should work', () => {
    const config = new Config();

    expect(config.env.prefix).toEqual('APPLE_MUSIC');
    expect(config.global.path).toEqual(`${os.homedir()}/.amrc`);
    expect(config.local.path).toEqual(`${process.cwd()}/.amrc`);
  });
});
