import { Albums } from './albums';
import { Artists } from './artists';
import { Search } from './search';

export class Client {
  constructor(readonly token: string, readonly code: string) {}

  get albums() {
    return new Albums(this);
  }

  get artists() {
    return new Artists(this);
  }

  get search() {
    return new Search(this);
  }
}
