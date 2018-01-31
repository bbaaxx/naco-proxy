import { Document } from 'camo';
import Mock from './Mock';
import User from './User';

export default class Collection extends Document {
  constructor() {
    super();

    this.name = String;
    this.description = String;
    this.accessKey = {
      type: String,
      unique: true,
    };

    this.sourceUri = String;
    this.proxy = Boolean;

    this.mocks = [Mock];
    this.user = User;
  }

  static collectionName() {
    return 'collections';
  }

  preDelete() {
    let deletes = [];
    this.mocks.forEach(mock => {
      deletes.push(
        new Promise(resolve => {
          resolve(mock.delete());
        }),
      );
    });
    return Promise.all(deletes);
  }
}
