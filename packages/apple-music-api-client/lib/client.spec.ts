import { Client } from './client';

describe('Client', () => {
  it('should provide token and code', () => {
    const client = new Client('__token__', '__code__');

    expect(client.token).toEqual('__token__');
    expect(client.code).toEqual('__code__');
  });
});
