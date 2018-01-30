import { Document } from 'camo';
import Request from './Request';
import Response from './Response';

export default class Mock extends Document {
  constructor() {
    super();

    this.name = String;
    this.description = String;

    this.uriPath = String;

    this.requests = [Request];
    this.responses = [Response];
  }

  static collectionName() {
    return 'mocks';
  }
}
