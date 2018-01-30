import { connect } from 'camo';
import { getVar } from './getEnv';

const { NEDB_URI } = getVar('NEDB_URI');

async function connectDb(uri) {
  return await connect(uri);
}

const database = connectDb(NEDB_URI);

export default database;
