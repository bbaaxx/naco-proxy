import { Document } from 'camo';
import Mock from './Mock';
import User from './User';

export default class Collection extends Document {
  constructor() {
    super();

    this.name = String;
    this.description = String;
    this.collectionKey = {
      type: String,
      unique: true,
    };

    this.mocks = [Mock];
    this.user = User;
  }

  static collectionName() {
    return 'collections';
  }
}
