import { Request } from "express";
import { ObjectId } from "mongodb";

export type UserDocument = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date;
  token: string;
};

export type UserDocumentReceived = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date;
  token: string;
} | null;

export type AuthenticatedRequest = Request & {
  user?: UserDocument;
};
