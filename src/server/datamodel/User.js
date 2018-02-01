import { Document, EmbeddedDocument } from 'camo';
import bcrypt from 'bcrypt';
import Collection from './Collection';

class UserSecret extends Document {
  constructor() {
    super();
    this.hash = {
      type: String,
    };
  }

  static collectionName() {
    return 'usersecrets';
  }
}

export default class User extends Document {
  constructor() {
    super();

    this.nickname = String;
    this.email = {
      type: String,
      unique: true,
      required: true,
    };

    this.password = String;
    this.secret = UserSecret;

    this.collections = [Collection];
  }

  static collectionName() {
    return 'users';
  }

  preSave() {
    const me = this;
    const userPassword = this.password;
    if (userPassword) {
      this.password = void 0;
      return bcrypt
        .hash(userPassword, 5)
        .then(hash => UserSecret.create({ hash }).save())
        .then(secret => {
          me.secret = secret;
        });
    }
  }

  preDelete() {
    let cleanup = [];

    if (this.secret) cleanup.push(this.secret.delete());

    this.collections.forEach(mock => {
      cleanup.push(
        new Promise(resolve => {
          resolve(mock.delete());
        }),
      );
    });
    return Promise.all(cleanup);
  }
}
