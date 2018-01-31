// @flow
import { Document } from 'camo';

const createDocument = (DataModel: Document, documentBody: any) =>
  DataModel.create(documentBody);

const createAndSaveDocument = async (DataModel: Document, documentBody: any) =>
  await createDocument(DataModel, documentBody).save();

const findOneDocument = async (DataModel, query) =>
  await DataModel.findOne(query);

export default {
  createDocument,
  createAndSaveDocument,
};
