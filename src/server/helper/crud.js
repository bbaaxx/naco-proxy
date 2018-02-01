// @flow
import { Document } from 'camo';

// @flow
type QueryOptions = {
  populate?: boolean,
  sort?: string,
  limit?: number,
  skip?: number,
};

// Create
export const createDocument = (DataModel: Document, documentBody: any) =>
  DataModel.create(documentBody);
export const createAndSaveDocument = async (
  DataModel: Document,
  documentBody: any,
) => await createDocument(DataModel, documentBody).save();

// Read
export const findDocument = async (
  DataModel: Document,
  query: any,
  options?: QueryOptions,
) => await DataModel.findOne(query, options);
export const findDocuments = async (
  DataModel: Document,
  query: any,
  options?: QueryOptions,
) => await DataModel.find(query);
export const countDocuments = async (DataModel: Document) =>
  await DataModel.count();

// Update
export const updateDocument = async (
  DataModel: Document,
  query: any,
  data: any,
  options?: QueryOptions,
) => {
  const document = await findDocument(DataModel, query, options);
  const updatedDocument = Object.assign(document, ...data);
  return await updatedDocument.save();
};

// Delete
export const deleteDocument = async (
  DataModel: Document,
  query: any,
  options?: QueryOptions,
) => {
  const document = await findDocument(DataModel, query, options);
  return await document.delete();
};
export const deleteDocuments = async (
  DataModel: Document,
  query: any,
  options?: QueryOptions,
) => {
  const documents = await findDocuments(DataModel, query, options);
  const deletes = documents.map(document => document.delete());
  return await Promise.all(deletes);
};

// Utilities
export const pushToParentProp = async (
  Child: Document,
  Parent: Document,
  parentProp: string,
) => {
  if (Array.isArray(Parent[parentProp])) {
    Parent[parentProp].push(Child._id);
  } else {
    Parent[parentProp] = Child._id;
  }
  return await Parent.save();
};
