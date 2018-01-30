import { Document } from 'camo';

export default class Response extends Document {
  constructor() {
    super();

    this.name = String;
    this.description = String;

    this.status = Number;
    this.headers = [Object];
    this.body = Object;
  }

  static collectionName() {
    return 'responses';
  }
}
