import { Document } from 'camo';
import Collection from './Collection';

export default class User extends Document {
  constructor() {
    super();

    this.email = {
      type: String,
      unique: true,
      required: true,
    };
    this.nickname = String;
    this.password = {
      type: String,
      required: true,
    };

    this.collections = [Collection];
  }

  static collectionName() {
    return 'users';
  }
}
