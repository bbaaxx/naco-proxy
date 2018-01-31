import { Document } from 'camo';
import Request from './Request';
import Response from './Response';
import Collection from './Collection';

export default class Mock extends Document {
  constructor() {
    super();

    this.name = String;
    this.description = String;

    this.uriPath = {
      type: String,
      unique: true,
    };

    this.response = Response;

    this.collection = Collection;
  }

  static collectionName() {
    return 'mocks';
  }
}
