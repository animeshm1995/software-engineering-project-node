/**
 * @file Implements mongoose model to CRUD
 * documents in the BookMark collection
 */
import mongoose from "mongoose";
import UnBookmarkSchema from "../bookmarks/UnBookmarkSchema";

const UnBookMarkModel = mongoose.model("BookMarkModel", UnBookmarkSchema);

export default UnBookMarkModel;