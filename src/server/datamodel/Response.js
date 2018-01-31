import { EmbeddedDocument } from 'camo';

export default class Response extends EmbeddedDocument {
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
