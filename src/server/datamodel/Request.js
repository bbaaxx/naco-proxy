import { Document } from 'camo';

export default class Request extends Document {
  constructor() {
    super();

    this.name = String;
    this.description = String;
    this.collection = String;

    this.method = String;
    this.params = [Object];
    this.headers = [Object];
    this.body = String;
  }

  static collectionName() {
    return 'requests';
  }
}
